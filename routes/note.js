const express = require('express')
const router = express.Router()
const connection = require('./functions/db.js')
const auth = require('./functions/auth.js')


router.put("/",auth,(req,res)=>{
    const month_id= req.body.month_id;
    const note = req.body.note;

    let sql =  `update savings set note = ${connection.escape(note)} where saving_month_id=${connection.escape(month_id)}`;
    connection.query(sql, (error, results, fields) => {
        if (error)
            res.sendStatus(500)
        return res.sendStatus(200);
    })
})

module.exports = router