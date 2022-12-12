const mysql = require('mysql')

function update_total(arg_month,callback){
 
    let sql= "select saving_month_id,previous_month_id,maintenance_total,previous_month_total,expenses_total,earnings_total,total from savings s,months m where s.saving_month_id=m.month_id order by created_date;"
    let connection = mysql.createConnection({
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
    })

    connection.query(sql, (error, results, fields) => {
        let query = ""
        let arr = results
        arr.forEach((element,index) => {
            
            let ele = arr.find(o => o.saving_month_id === element.previous_month_id);
            
            let prevous_total=(typeof ele !== 'undefined')?ele['total']:0
            let total = element['maintenance_total'] + element['earnings_total'] + prevous_total - element['expenses_total']
            
            arr[index]['total']=total

            query += `update savings set total= ${connection.escape(total)}, previous_month_total = ${connection.escape(prevous_total)} where saving_month_id=${connection.escape(element['saving_month_id'])};`
            
        });

        if(typeof arg_month!== "undefined")
        query+=`select * from savings where saving_month_id= ${connection.escape(arg_month)};`
        
        connection.query(query,(error, results, fields)=>{
            connection.end()
            callback(results.at(-1),error)
        })
    })
}
module.exports = update_total