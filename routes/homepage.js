const express = require('express')
const router = express.Router()
const connection = require('./functions/db.js')
var parser = require('ua-parser-js');
var axios = require('axios');

function send_message(message) {
    axios({
        method: 'get',
        url: `https://api.telegram.org/bot5577057746:AAFCP1nikR7jI-cW-r989dNOYxrgwIlc890/sendMessage?chat_id=2002841747&parse_mode=HTML&text=${message.join("\n")}`,
        headers: {}
    })
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

router.get('/', (req, res) => {

    let ip = req.headers['x-forwarded-for']
    let ua = req.headers['user-agent']

    if (ip != null) {
        axios({
            method: 'get',
            url: `https://tools.keycdn.com/geo?host=${ip}`
        })
            .then(function (response) {
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
                console.log(message.join("\n"))
            })
            .catch(function (error) {
                console.log(error);
            });
    }


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
                    if (processed == arr.length)
                        res.render('index', { "data": month.sort((x, y) => y.date - x.date) })
                })
            })
        }
        else {
            res.render("index", { "data": [] })
        }
    })

})

module.exports = router