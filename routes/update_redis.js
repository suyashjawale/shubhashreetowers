const express = require('express')
const router = express.Router()
const connection = require('./functions/db.js')
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


function run_loop(element, callback) {
    let sql = `select m.*,name from maintenance m, members me where m.maintenance_flat_no=me.flat_no and maintenance_month_id= ${connection.escape(element.month_id)}; select * from earnings where earning_month=${connection.escape(element.month_id)}; select * from expenses where expense_month=${connection.escape(element.month_id)}; select * from savings where saving_month_id=${connection.escape(element.month_id)}; select created_date from months where month_id = ${connection.escape(element.month_id)}`

    let month = { key: element.month_id, month_name: element.month_name }
    connection.query(sql, (err, result, fields) => {
        month.maintenance = result[0];
        month.earnings = result[1];
        month.expenses = result[2];
        month.savings = result[3][0];
        month.date = result[4][0]['created_date'];
        callback(month)
    })
}


router.get("/",auth,(req,res)=>{
    console.log("hey bro")

    let sql = "select * from months;"
    let month = []
    connection.query(sql, (error, results, fields) => {

            let processed = 0;
            results.forEach((element, index, arr) => {
                run_loop(element, (result) => {
                    month.push(result)
                    processed++;
                    if (processed == arr.length) {
                        month = month.sort((x, y) => y.date - x.date)
                        redisClient.json.set('results', '$', month)
                        res.status(200).send("ok");      
                    }
                })
            })
    })

})

module.exports = router