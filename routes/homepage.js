const express = require('express')
const router = express.Router()
const connection = require('./functions/db.js')
const client = require('./functions/redis.js')
var parser = require('ua-parser-js');
var moment = require('moment-timezone');
var axios = require('axios');

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

router.get('/', (req, res) => {

    let ipAddress = req.headers['x-forwarded-for'] != null ? req.headers['x-forwarded-for'] : 'NA'
    
    var config = {
        method: 'get',
        url: `https://api.telegram.org/bot5577057746:AAFCP1nikR7jI-cW-r989dNOYxrgwIlc890/sendMessage?chat_id=2002841747&parse_mode=HTML&text=${ipAddress}`,
        headers: { }
      };
      
    const visitors = {
        "ip" : ipAddress,
        "visit_time": moment().tz('Asia/Kolkata').format('MMMM Do YYYY, h:mm:ss a'),
        "user-agent" :parser(req.headers['user-agent'])
    }

    axios(config)

    client("JSON.SET",[ipAddress, "$", JSON.stringify(visitors)])

    let sql = "select * from months;"
    let month = []

    connection.query(sql, (error, results, fields) => {
        if(typeof results==="undefined")
        res.render('load')
        if (results.length >0) {
            let processed = 0;
            results.forEach((element, index, arr) => {
                run_loop(element, (result) => {
                    month.push(result)
                    processed++;
                    if (processed == arr.length)
                        res.render('index', { "data": month.sort((x, y) => y.date - x.date) })
                })
            })
        }
        else
        {
            res.render("index",{"data":[]})
        }
    })

})

module.exports = router