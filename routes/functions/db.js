const mysql = require('mysql')

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'suyash',
//   database: 'building',
//   port : '2030',
//   multipleStatements: true
// })

const connection = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b1d16b7d5443dc',
    password: '8f04af86',
    database: 'heroku_231d0204ca36e60',
    multipleStatements: true
  })

  // mysql://b1d16b7d5443dc:8f04af86@us-cdbr-east-06.cleardb.net/heroku_231d0204ca36e60?reconnect=true
  // o
  
module.exports = connection;


