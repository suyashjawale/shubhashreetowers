const express = require('express')
const mysql = require('mysql')
const auth = require('./functions/auth.js')
const router = express.Router()

router.get('/', auth,(req, res) => {
    
    let connection = mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b1d16b7d5443dc',
        password: '8f04af86',
        database: 'heroku_231d0204ca36e60',
        multipleStatements: true
    })
    
    const month = req.query.month;
    let query = "latest=1;"

    if (typeof month != 'undefined')
        query = `m.month_id=${connection.escape(month)};`;

    let sql1 = 'select * from months order by created_date desc;'

    let sql2 = `select maintenance_id,name,maintenance_flat_no,month_id, month_name,maintenance_status,maintenance_amount,maintenance_date from maintenance , members, months m where maintenance.maintenance_month_id = m.month_id and maintenance.maintenance_flat_no=members.flat_no and ${query}`

    let sql3 = `select earning_id, earning_title, earning_amount, earning_date from earnings , months m where earnings.earning_month=m.month_id and ${query}`

    let sql4 = `select expense_id, expense_title, expense_amount, expense_date from expenses , months m where m.month_id = expenses.expense_month and ${query}`

    let sql5 = `select maintenance_total, previous_month_total, expenses_total, earnings_total, total , note from savings, months m where savings.saving_month_id=m.month_id and ${query}`

    let sql = sql1 + sql2 + sql3 + sql4 + sql5

    connection.query(sql, (error, results, fields) => {
        console.log(error);        
        res.render('dashboard',{
            "months_list": results[0],
            "maintenance": results[1],
            "earnings": results[2],
            "expenses": results[3],
            "savings": results[4]
        })
        connection.end();
    })
})

module.exports = router