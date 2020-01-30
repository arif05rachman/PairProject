
const express = require('express')
const app = express()
const port = 3000

const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const adminRouter = require('./routers/admin/adminRouter')

app.locals.helper = require('./helpers/helper')

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.set('view engine', 'ejs')

app.use(cookieParser('keyboard cat'))
app.use(flash())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use('/admin', adminRouter)

app.listen(port, () => console.log(`Listening to ${port}!`))
