const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const auth = require('./functions/auth.js')
const update_total= require('./functions/update_savings.js')


router.post('/', auth,(req, res) => {

    const maintenance_id = req.body.maintenance_id;
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })
    let sql = `select maintenance_id,maintenance_flat_no,name,maintenance_status,maintenance_amount,maintenance_date from maintenance m , members me where m.maintenance_flat_no=me.flat_no and maintenance_id=${connection.escape(maintenance_id)};`

    connection.query(sql, (error, results, fields) => {
        connection.end();
        res.status(200).send(results);
    })
})


router.put('/', auth,(req, res) =>{
    const edit_maintenance_id = req.body.edit_maintenance_id;
    const edit_payment_status = req.body.edit_payment_status;
    const edit_payment_amount = req.body.edit_payment_amount;
    const edit_payment_date = req.body.edit_payment_date;
    const edit_payment_month = req.body.edit_payment_month;
    
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })

    if(edit_maintenance_id!=null && edit_payment_status!=null && edit_payment_amount!=null && edit_payment_date!=null && edit_payment_month!=null)
    {
        let sql1 = `update maintenance set maintenance_status=${connection.escape(edit_payment_status)},maintenance_amount=${connection.escape(edit_payment_amount)},maintenance_date=${connection.escape(edit_payment_date)} where maintenance_id=${connection.escape(edit_maintenance_id)};`;

        let sql2 = `update savings a inner join (select maintenance_month_id, IFNULL(sum(maintenance_amount),0) as maintenance_amt from maintenance where maintenance_month_id=${connection.escape(edit_payment_month)} and maintenance_status=1) b on a.saving_month_id=b.maintenance_month_id set a.maintenance_total= b.maintenance_amt;`;

        let sql= sql1+sql2

        connection.query(sql ,function(error, results, fields) {
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else
            {   
                update_total(edit_payment_month,(result)=>{
                    connection.end();
                    res.status(200).send(result);
                })
            }
        })
    }
})


module.exports = router