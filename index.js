const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const homeRoute = require('./routes/homepage')
const adminRoute = require('./routes/admin')
const authenticationRoute = require('./routes/authenticate')
const monthsRoute = require('./routes/months')
const maintenanceRoute = require('./routes/maintenance')
const earningsRoute = require('./routes/earnings')
const expensesRoute = require('./routes/expenses')
const noteRoute = require('./routes/note')

const app = express()
const port = process.env.PORT ||3000;

app.set('view engine', 'ejs')
app.locals.moment = require('moment');

app.use(bodyParser.urlencoded({
  extended: true,
  limit:'5mb'
}))

app.use(express.static('public'));
app.use(session({
  secret: 'DojaCATiSmY123098@L06e',
  resave: false,
  saveUninitialized: true
}));

app.use('/',homeRoute)
app.use('/authenticate',authenticationRoute)
app.use('/admin',adminRoute)
app.use('/months',monthsRoute)
app.use('/maintenance',maintenanceRoute)
app.use('/earnings',earningsRoute)
app.use('/expenses',expensesRoute)
app.use('/note',noteRoute)

app.listen(port, () => {
  console.log(`Server listening ${port}`)
})
