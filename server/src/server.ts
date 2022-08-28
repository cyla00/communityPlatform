require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const os = require('os')
const bodyParser = require('body-parser')
import registration  from './modules/registration'
import login  from './modules/login'
import email_verification  from './modules/email_verification'

import { buildDb } from './modules/database'

buildDb()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/registration', registration)
app.use('/api/verify_email/:id', email_verification)
app.use('/api/login', login)



app.listen(process.env.SERVER_PORT, () => {
    console.log(`http://${os.hostname()}:${process.env.SERVER_PORT}`)
})