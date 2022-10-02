const express = require('express')
const router = express.Router()
const redis = require("redis");
const connection = require('./functions/db.js')
var parser = require('ua-parser-js');
var axios = require('axios');
const cheerio = require('cheerio');

let redisClient;

(async () => {
    redisClient = redis.createClient({
        url: 'redis://:U8haIOYA9qNXSpbF37CMnY7cXjOWoyzf@redis-16023.c212.ap-south-1-1.ec2.cloud.redislabs.com:16023'
    });

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();

function send_message(message) {
    axios({
        method: 'get',
        url: `https://api.telegram.org/bot5577057746:AAFCP1nikR7jI-cW-r989dNOYxrgwIlc890/sendMessage?chat_id=2002841747&parse_mode=HTML&text=${message.join("\n")}`,
        headers: {}
    })
}

async function redis_DB(req, res, next) {
    const cacheResults = await redisClient.json.get('results')
    if (cacheResults) {
        res.render('index', { "data": cacheResults })
    }
    else {
        next();
    }
}

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

function mysql_DB(req, res) {

    try
    {
        let sql = "select * from months;"
        let month = []

        connection.query(sql, (error, results, fields) => {
            if (typeof results == "undefined")
                res.render('load')
            if (results.length > 0) {
                let processed = 0;
                results.forEach((element, index, arr) => {
                    run_loop(element, (result) => {
                        month.push(result)
                        processed++;
                        if (processed == arr.length) {
                            month = month.sort((x, y) => y.date - x.date)
                            redisClient.json.set('results', '$', month)
                            res.render('index', { "data": month })
                        }
                    })
                })
            }
            else {
                res.render("index", { "data": [] })
            }
        })
    }
    catch(e)
    {
        send_message("Bro site has crashed");        
        res.send("OOPS, site crashed. ")
    }
}

function telegram(req, res, next) {
    let ip = req.headers['x-forwarded-for']
    let ua = req.headers['user-agent']

    if (ip != null) {
        axios({
            method: 'get',
            url: `https://tools.keycdn.com/geo?host=${ip}`
        }).then(function (response) {
                let info = parser(ua)
                let message = []
                let $ = cheerio.load(response.data);
                $('#geoResult dd').each((index, element) => {
                    message.push($(element).text());
                });
                message.push(Object.values(info.browser))
                message.push(Object.values(info.device))
                message.push(Object.values(info.os))
                message.push(Object.values(info.cpu))
                send_message(message)
            })
            .catch(function (error) {
                send_message(["error"]);
            });
    }
    next();
}

router.get('/', telegram, redis_DB, mysql_DB)

module.exports = router
