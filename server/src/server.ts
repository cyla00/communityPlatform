require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
var cors = require('cors')
const os = require('os')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { Server } = require("socket.io")
import { createClient } from 'redis'
const redis = createClient({url: process.env.REDIS_URL})
const io = new Server(server, {
    cors:{
        origins: ["*"]
    }
})


import registration  from './modules/registration'
import login  from './modules/login'
import token  from './modules/token'
import email_verification  from './modules/email_verification'
import recover_account from './modules/recover_account'
import renew_password from './modules/renew_password'
import update_user_data from './modules/update_user_data'
import { jwt_verification } from './modules/jwt_verification'

import { buildDb, openDbConnection } from './modules/database'
buildDb()


// MIDDLEWARES EXPRESS
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// MIDDLEWARES SOCKET.IO
io.use((socket:any, next:any) => {
    const header = socket.handshake.headers['authorization']
    const token = header.split(' ')[1]
    if(token == null)return next(new Error('authentication error'))

    jwt.verify(token, process.env.SECRET_KEY, (err:any, user:any) => {
        if(err) return next(new Error('authentication error'))
        if(user.authority == 'admin' && !user.is_admin) return next(new Error('authentication error'))
        if(user.authority == 'staff' && !user.is_staff) return next(new Error('authentication error'))
        if(user.authority == 'users' && user.is_staff) return next(new Error('authentication error'))
        if(user.authority == 'users' && user.is_admin) return next(new Error('authentication error'))
        next()
    })
})


// ROUTES
app.use('/api/registration', registration)
app.use('/api/verify-email', email_verification)
app.use('/api/login', login)
app.use('/api/token', jwt_verification, token)
app.use('/api/recover-account', recover_account)
app.use('/api/set-pass', renew_password)
app.use('/api/update-user-data', jwt_verification, update_user_data)



io.on('connection', async (socket:any) => {
    console.log('A user connected')
    await socket.join('data_fetch') 

    redis.on('error', (err:any) => console.log('Redis Client Error', err))
    await redis.connect()

    await io.sockets.in('data_fetch').emit('data', redis.get('data'))
    socket.on('disconnect', () => {
        console.log('socket off')
      })
})

// io.on('connection', (socket:any) => {
//     console.log('socket on')
//     socket.emit('room', 'data_fetch')
// })


if(process.env.PROJECT_STATUS === 'production'){
    app.use(express.static(__dirname + '/dist'))
    app.get(/.*/, (req:any, res:any) => {
        res.sendFile(__dirname + '/dist/index.html')
    })
}


server.listen(process.env.SERVER_PORT, () => {
    console.log(`http://${os.hostname()}:${process.env.SERVER_PORT}`)
})