const express = require('express')
const router = express.Router()
const auth = require('./functions/auth.js')
const redis = require("redis");

let redisClient;

(async () => {
    redisClient = redis.createClient({
        url: 'redis://:U8haIOYA9qNXSpbF37CMnY7cXjOWoyzf@redis-16023.c212.ap-south-1-1.ec2.cloud.redislabs.com:16023'
    });

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();


const mysql = require('mysql2/promise');

let connection;

(async () => {
    connection = await mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b1d16b7d5443dc',
        password: '8f04af86',
        database: 'heroku_231d0204ca36e60'
    });
})();

async function getInfo(query,values){  
    const [rows, fields] = await connection.execute(query,values);
    return rows;
}

router.get("/",auth,async (req,res)=>{

    let results = await getInfo("select * from months",[]);
    let month=[]

    let processed = 0;
    results.forEach( async (element, index, arr) => {
        let month_id = element.month_id;
        let month_name = element.month_name;
        let maintenance = await getInfo('select m.*,name from maintenance m, members me where m.maintenance_flat_no=me.flat_no and maintenance_month_id = ?',[element.month_id]);
        let earnings = await getInfo('select * from earnings where earning_month= ? ',[element.month_id])
        let expenses = await getInfo('select * from expenses where expense_month= ? ',[element.month_id])
        let savings = await getInfo('select * from savings where saving_month_id= ?',[element.month_id])
        let date = await getInfo('select created_date from months where month_id = ?',[element.month_id])
        
        month.push({
            key : month_id,
            month_name : month_name,
            maintenance : maintenance,
            earnings : earnings,
            expenses : expenses,
            savings : savings[0],
            date : date[0]['created_date']
        })
      
        processed++;
        if (processed == arr.length) {
            month = month.sort((x, y) => y.date - x.date)
            // redisClient.json.set('results', '$', month)
            res.status(200).send("ok");
        }
    })

})

module.exports = router

















