const express = require('express')
const router = express.Router()
const auth = require('./functions/auth.js')
const capitalize = require('./functions/capitalize.js')
const update_total = require('./functions/update_savings.js')
const mysql = require('mysql2')

router.post('/', auth, (req, res) => {

    const insert_earnings_title = capitalize(req.body.insert_earnings_title).trim();
    const insert_earnings_amount = req.body.insert_earnings_amount;
    const insert_earnings_date = req.body.insert_earnings_date;
    const insert_earnings_month = req.body.insert_earnings_month.toLowerCase().trim();
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })

    if (insert_earnings_title != null && insert_earnings_amount != null && insert_earnings_date != null && insert_earnings_month != null) {
        let sql1 = `insert into earnings (earning_month, earning_title, earning_amount,earning_date,earning_photo) values (${connection.escape(insert_earnings_month)},${connection.escape(insert_earnings_title)},${connection.escape(insert_earnings_amount)},${connection.escape(insert_earnings_date)},'na');`;

        let sql2 = `update savings a inner join (select earning_month,IFNULL(sum(earning_amount),0) as earning_amt from earnings where earning_month=${connection.escape(insert_earnings_month)}) b on a.saving_month_id=b.earning_month set a.earnings_total= b.earning_amt;`;

        let sql = sql1 + sql2
        connection.query(sql, (error, results, fields) => {
            console.log(error);
            console.log(results);
            if(error)
                res.sendStatus(500);
            connection.end();
            update_total(insert_earnings_month, (result, status) => {
                if (status)
                    res.sendStatus(500)
                res.status(200).send({ ...{ "earning_id": results[0].insertId }, ...result[0] });
            })
        })
    }
})


router.get('/', auth, (req, res) => {
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })

    const earning_id = req.query.earning_id;
    let sql = `select * from earnings where earning_id= ${connection.escape(earning_id)}`
    
    connection.query(sql, (error, results, fields) => {
        if (error)
            res.sendStatus(500)
        connection.end();
        return res.status(200).send(results);
    })

})

router.put('/', auth, function (req, res) {
    const edit_earning_id = req.body.edit_earning_id;
    const edit_earning_title = req.body.edit_earning_title.trim();
    const edit_earning_amount = req.body.edit_earning_amount;
    const edit_earning_date = req.body.edit_earning_date;
    const edit_earning_month = req.body.edit_earning_month.toLowerCase().trim();
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })

    if (edit_earning_title != null && edit_earning_amount != null && edit_earning_date != null && edit_earning_month != null) {
        let sql1 = `update earnings set earning_title=${connection.escape(edit_earning_title)},earning_amount=${connection.escape(edit_earning_amount)},earning_date=${connection.escape(edit_earning_date)} where earning_id=${connection.escape(edit_earning_id)};`;

        let sql2 = `update savings a inner join (select earning_id, earning_month,IFNULL(sum(earning_amount),0) as earning_amt from earnings where earning_month=${connection.escape(edit_earning_month)}) b on a.saving_month_id=b.earning_month set a.earnings_total= b.earning_amt;`;

        let sql = sql1 + sql2
        connection.query(sql, (error, results, fields) => {
            if (error)
                res.sendStatus(500)
            update_total(edit_earning_month, (result, status) => {
                if (status)
                    res.sendStatus(500)
                connection.end();
                res.status(200).send(result);
            })
        })
    }
})


router.delete('/',auth, (req, res) => {
    const delete_earning_id = req.body.delete_earning_id;
    const delete_month = req.body.delete_month;
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })

    let sql1 = `delete from earnings where earning_id= ${connection.escape(delete_earning_id)};`
    
    let sql2 = `update savings a inner join (select IFNULL(earning_month,${connection.escape(delete_month)}) as earning_month,IFNULL(sum(earning_amount),0) as earning_amt from earnings where earning_month=${connection.escape(delete_month)}) b on a.saving_month_id=b.earning_month set a.earnings_total= b.earning_amt;`;

    let sql = sql1 + sql2

    connection.query(sql, (error, results, fields) => {
        if (error)
            res.sendStatus(500)
        update_total(delete_month, (result, status) => {
            if (status)
                res.sendStatus(500)
            connection.end();
            res.status(200).send(result);
        })
    })

})

module.exports = router