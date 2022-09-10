require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const os = require('os')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { Server } = require("socket.io")
const io = new Server(server, {
    cors:{
        origin: `${process.env.CLIENT_HOST}`
    }
})


import registration  from './modules/registration'
import login  from './modules/login'
import token  from './modules/token'
import email_verification  from './modules/email_verification'
import recover_account from './modules/recover_account'
import renew_password from './modules/renew_password'

import { jwt_verification } from './modules/jwt_verification'

import update_user_data from './modules/update_user_data'
import { users } from './modules/update_user_data'

import update_games_data from './modules/update_games_data'

import advertisements_data from './modules/advertisements_data'

import events_data from './modules/events_data'

import { buildDb, openDbConnection } from './modules/database'
import { isBigIntLiteral } from 'typescript'
buildDb()
// MIDDLEWARES EXPRESS
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// MIDDLEWARES SOCKET.IO
// io.use((socket:any, next:any) => {
//     const header = socket.handshake.headers['authorization']
//     const token = header.split(' ')[1]
//     if(token == null)return next(new Error('authentication error'))

//     jwt.verify(token, process.env.SECRET_KEY, (err:any, user:any) => {
//         if(err) return next(new Error('authentication error'))
//         if(user.authority == 'admin' && !user.is_admin) return next(new Error('authentication error'))
//         if(user.authority == 'staff' && !user.is_staff) return next(new Error('authentication error'))
//         if(user.authority == 'users' && user.is_staff) return next(new Error('authentication error'))
//         if(user.authority == 'users' && user.is_admin) return next(new Error('authentication error'))
//         next()
//     })
// })


// ROUTES
app.use('/api/registration', registration)
app.use('/api/verify-email', email_verification)
app.use('/api/login', login)
app.use('/api/token', jwt_verification, token)
app.use('/api/recover-account', recover_account)
app.use('/api/set-pass', renew_password)
app.use('/api/update-user-data', jwt_verification, update_user_data)
app.use('/api/update-games-data', jwt_verification, update_games_data)
app.use('/api/advertisements_data', jwt_verification, advertisements_data)
app.use('/api/events_data', jwt_verification, events_data)



io.on('connection', (socket:any) => {
    socket.join('data_fetch')
    io.sockets.in('data_fetch').emit('user_data', users)
})


if(process.env.PROJECT_STATUS === 'production'){
    app.use(express.static(__dirname + '/dist'))
    app.get(/.*/, (req:any, res:any) => {
        res.sendFile(__dirname + '/dist/index.html')
    })
}


server.listen(process.env.SERVER_PORT, () => {
    console.log(`http://${os.hostname()}:${process.env.SERVER_PORT}`)
})