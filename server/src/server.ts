require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const os = require('os')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

import registration  from './modules/registration'
import login  from './modules/login'
import token  from './modules/token'
import email_verification  from './modules/email_verification'
import recover_account from './modules/recover_account'
import renew_password from './modules/renew_password'
import { jwt_verification } from './modules/jwt_verification'

import { buildDb } from './modules/database'
buildDb()


// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


// ROUTES
app.use('/api/registration', registration)
app.use('/api/verify-email', email_verification)
app.use('/api/login', login)
app.use('/api/token', jwt_verification, token)
app.use('/api/recover-account', recover_account)
app.use('/api/set-pass', renew_password)


if(process.env.PROJECT_STATUS === 'production'){
    app.use(express.static(__dirname + '/dist'))
    app.get(/.*/, (req:any, res:any) => {
        res.sendFile(__dirname + '/dist/index.html')
    })
}


app.listen(process.env.SERVER_PORT, () => {
    console.log(`http://${os.hostname()}:${process.env.SERVER_PORT}`)
})