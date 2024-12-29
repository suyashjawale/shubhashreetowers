const express = require('express')
const router = express.Router()
const auth = require('./functions/auth.js')
// const redis = require("redis");
const moment = require('moment');
const admin = require('firebase-admin');

let redisClient;

// (async () => {
//     redisClient = redis.createClient({
//         url: 'redis://:LqZu6ToMpLEz3oKhMck9fXnFHiLW2F0x@redis-17595.c212.ap-south-1-1.ec2.cloud.redislabs.com:17595'
//     });

//     redisClient.on("error", (error) => console.error(`Error : ${error}`));

//     await redisClient.connect();
// })();

const serviceAccount = require('./key.json'); // Replace with the path to your JSON file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Get a reference to the Firestore database

const mysql = require('mysql2/promise');

let connection;

(async () => {
    connection = await mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        dateStrings: true
    });
})();

async function getInfo(query, values) {
    const [rows, fields] = await connection.execute(query, values);
    return rows;
}

function prependZero(number) {
    if (number < 10)
        return "0" + number;
    else
        return number;
 }

router.get("/", async (req, res) => {

    let results = await getInfo("select * from months order by created_date desc", []);
    let month = [];

    let processed = 0;
    results.forEach(async (element, index, arr) => {
        let month_id = element.month_id;
        let month_name = element.month_name;
        let maintenance = await getInfo(`select maintenance_flat_no as Flat,name as Owner, maintenance_amount as Amount,CASE WHEN maintenance_status=1 THEN 'Paid' ELSE 'Unpaid' END as Status, DATE_FORMAT(maintenance_date,"%d %b %Y") as Date from maintenance m, members me where m.maintenance_flat_no=me.flat_no and maintenance_month_id = ?`, [element.month_id]);
        let earnings = await getInfo('select earning_title, earning_amount, DATE_FORMAT(earning_date,"%d %b %Y") as earning_date from earnings where earning_month= ? ', [element.month_id])
        let expenses = await getInfo('select expense_title, expense_amount, DATE_FORMAT(expense_date,"%d %b %Y") as expense_date from expenses where expense_month= ? ', [element.month_id])
        let savings = await getInfo('select * from savings where saving_month_id= ?', [element.month_id])
        let date = await getInfo('select created_date from months where month_id = ?', [element.month_id])

        month.push({
            key: month_id,
            month_name: month_name,
            maintenance: maintenance,
            earnings: earnings,
            expenses: expenses,
            savings: savings[0],
            date: new Date(date[0]['created_date'])
        });

        processed++;
        if (processed == arr.length) {
            month = month.sort((x, y) => y.date - x.date)

            for(let i=0;i < month.length;i++){
                db.collection('building-maintenance').doc('a'+prependZero(i)).set(month[i])
                .then(() => {
                    console.log('Month added with ID:', month[i].key);
                })
                .catch(error => {
                    console.error('Error adding user:', error);
                });
            }
            // redisClient.json.set('results', '$', month)
            res.status(200).send(month);
        }
    })

})

module.exports = router

















