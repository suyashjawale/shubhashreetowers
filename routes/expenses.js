const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const auth = require('./functions/auth.js')
const update_total = require('./functions/update_savings.js')

router.post('/', auth, (req, res) => {

    const insert_expense_title = req.body.insert_expense_title.trim();
    const insert_expense_amount = req.body.insert_expense_amount;
    const insert_expense_date = req.body.insert_expense_date;
    const insert_expense_month = req.body.insert_expense_month.toLowerCase().trim();
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })

    if(insert_expense_title!=null && insert_expense_amount!=null && insert_expense_date!=null && insert_expense_month!=null)
    {        
        let sql1 = `insert into expenses (expense_month, expense_title, expense_amount,expense_date,expense_photo) values (${connection.escape(insert_expense_month)},${connection.escape(insert_expense_title)},${connection.escape(insert_expense_amount)},${connection.escape(insert_expense_date)},'na');`;

        let sql2 = `update savings a inner join (select expense_month,IFNULL(sum(expense_amount),0) as expense_amt from expenses where expense_month=${connection.escape(insert_expense_month)}) b on a.saving_month_id=b.expense_month set a.expenses_total= b.expense_amt;`;

        let sql = sql1 + sql2
        
        connection.query(sql, (error, results, fields) => {
            if (error)
                res.sendStatus(500)
            update_total(insert_expense_month, (result, status) => {
                if (status)
                    res.sendStatus(500)
                connection.end();
                res.status(200).send({ ...{ "expense_id": results[0].insertId }, ...result[0] });
            })
        })
    }
})


router.get('/', auth, (req, res) => {
    const expense_id = req.query.expense_id;
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })
    let sql = `select * from expenses where expense_id= ${connection.escape(expense_id)}`
    connection.query(sql, (error, results, fields) => {
        if (error)
            res.sendStatus(500)
        connection.end();
        return res.status(200).send(results[0]);
    })

})

router.put('/', auth, function (req, res) {
    const edit_expense_id = req.body.edit_expense_id;
    const edit_expense_title = req.body.edit_expense_title.trim();
    const edit_expense_amount = req.body.edit_expense_amount;
    const edit_expense_date = req.body.edit_expense_date;
    const edit_expense_month = req.body.edit_expense_month;
    const connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })

    if(edit_expense_title!=null && edit_expense_amount!=null && edit_expense_date!=null && edit_expense_month!=null)
    {
        let sql1 = `update expenses set expense_title=${connection.escape(edit_expense_title)},expense_amount=${connection.escape(edit_expense_amount)},expense_date=${connection.escape(edit_expense_date)} where expense_id=${connection.escape(edit_expense_id)};`;

        let sql2 = `update savings a inner join (select expense_month,IFNULL(sum(expense_amount),0) as expense_amt from expenses where expense_month=${connection.escape(edit_expense_month)}) b on a.saving_month_id=b.expense_month set a.expenses_total= b.expense_amt;`;

        let sql = sql1 + sql2

        connection.query(sql, (error, results, fields) => {
            if (error)
                res.sendStatus(500)
            update_total(edit_expense_month, (result, status) => {
                if (status)
                    res.sendStatus(500)
                connection.end();
                res.status(200).send(result);
            })
        })
    }
})


router.delete('/', auth, (req, res) => {
    const delete_expense_id = req.body.delete_expense_id;
    const delete_expense_month = req.body.delete_expense_month;
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })
    let sql1 = `delete from expenses where expense_id= ${connection.escape(delete_expense_id)};`
    
    let sql2 = `update savings a inner join (select IFNULL(expense_month,${connection.escape(delete_expense_month)}) as expense_month,IFNULL(sum(expense_amount),0) as expense_amt from expenses where expense_month=${connection.escape(delete_expense_month)}) b on a.saving_month_id=b.expense_month set a.expenses_total= b.expense_amt;`;

    let sql = sql1 + sql2

    connection.query(sql, (error, results, fields) => {
        if (error)
            res.sendStatus(500)
        update_total(delete_expense_month, (result, status) => {
            if (status)
                res.sendStatus(500)
            connection.end();
            res.status(200).send(result);
        })
    })

})

module.exports = router