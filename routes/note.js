const express = require('express')
const router = express.Router()
const auth = require('./functions/auth.js')
const mysql = require('mysql')

router.put("/",auth,(req,res)=>{
    const month_id= req.body.month_id;
    const note = req.body.note;

    const connection = mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b1d16b7d5443dc',
        password: '8f04af86',
        database: 'heroku_231d0204ca36e60',
        multipleStatements: true
    })
    
    let sql =  `update savings set note = ${connection.escape(note)} where saving_month_id=${connection.escape(month_id)}`;
    connection.query(sql, (error, results, fields) => {
        if (error)
            res.sendStatus(500)
        return res.sendStatus(200);
    })
    connection.end();
})

module.exports = router