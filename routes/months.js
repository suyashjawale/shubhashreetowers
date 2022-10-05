const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const auth = require('./functions/auth.js')
const capitalize = require('./functions/capitalize.js')
const update_total= require('./functions/update_savings.js')

router.post('/',auth, (req, res) => {

    const month_id = req.body.month_id.toLowerCase().trim();
    const month_name = capitalize(req.body.month_name).trim();
    const date = new Date();
    const insert_month_previous = req.body.insert_month_previous.toLowerCase();
    const insert_month_latest = req.body.insert_month_latest;
    let connection = mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b1d16b7d5443dc',
        password: '8f04af86',
        database: 'heroku_231d0204ca36e60',
        multipleStatements: true
    })

    let modify_latest = ""
    if (insert_month_latest == "1")
        modify_latest = "update months set latest=0;"

    let sql1 = `insert into months values (${connection.escape(month_id)},${connection.escape(month_name)},${connection.escape(insert_month_previous)},${connection.escape(date)},${connection.escape(insert_month_latest)});`

    let sql2 = `insert into maintenance(maintenance_flat_no,maintenance_month_id,maintenance_status,maintenance_amount,maintenance_date) select flat_no,${connection.escape(month_id)},0,0,${connection.escape(date)} from members;`

    let sql3 = `insert into savings values(${connection.escape(month_id)},0,0,0,0,0,0,'None');`

    let sql = modify_latest + sql1 + sql2 + sql3

    connection.query(sql, (error, results, fields) => {
        update_total(null,(result,status)=>{
            if (status)
                res.sendStatus(500)
            connection.end();
            res.sendStatus(200);
        })
    })
})

module.exports = router