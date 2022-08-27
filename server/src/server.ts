require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const { MongoClient } = require('mongodb')
const os = require('os')
import registration  from './modules/registration'
import login  from './modules/login'
import { run } from './modules/database'

run()

app.use('/api/registration', registration)
app.use('/api/login', login)


app.listen(process.env.SERVER_PORT, () => {
    console.log(`http://${os.hostname()}:${process.env.SERVER_PORT}`)
})