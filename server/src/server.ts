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
import change_password from './modules/change_password'
import update_credentials from './modules/update_credentials'
import delete_account from './modules/delete_account'
import add_game from './modules/add_game'
import remove_game from './modules/remove_game'
import get_servers from './modules/get_servers'
import add_server from './modules/add_server'
import remove_server from './modules/remove_server'
import referral from './modules/referral'
import get_events from './modules/get_events'
import add_event from './modules/add_event'
import remove_event from './modules/remove_event'
import add_advertisement from './modules/add_advertisement'
import remove_advertisement from './modules/remove_advertisement'
 
import { jwt_verification } from './modules/jwt_verification'

import update_user_data from './modules/update_user_data'
import { users } from './modules/update_user_data'

import update_games_data from './modules/update_games_data'

import advertisements_data from './modules/advertisements_data'

import events_data from './modules/events_data'

import profile_image from './modules/profile_image'

import { buildDb, openDbConnection } from './modules/database'
import { application } from 'express'
buildDb()
// MIDDLEWARES EXPRESS
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/images', express.static('images'))
app.use('/games', express.static('games'))
app.use('/advertisements', express.static('advertisements'))

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
app.use('/api/referral', referral)
app.use('/api/verify-email', email_verification)
app.use('/api/login', login)
app.use('/api/token', jwt_verification, token)
app.use('/api/recover-account', recover_account)
app.use('/api/set-pass', renew_password)
app.use('/api/update-user-data', jwt_verification, update_user_data)
app.use('/api/update-games-data', jwt_verification, update_games_data)
app.use('/api/advertisements-data', jwt_verification, advertisements_data)
app.use('/api/save-profile-image', jwt_verification, profile_image)
app.use('/api/change-password', jwt_verification, change_password)
app.use('/api/update-credentials', jwt_verification, update_credentials)
app.use('/api/delete-account', jwt_verification, delete_account)
app.use('/api/add-game', jwt_verification, add_game)
app.use('/api/remove-game', jwt_verification, remove_game)
app.use('/api/update-servers-data', jwt_verification, get_servers)
app.use('/api/add-server', jwt_verification, add_server)
app.use('/api/remove-server', jwt_verification, remove_server)
app.use('/api/add-event', jwt_verification, add_event)
app.use('/api/update-events-data', jwt_verification, get_events)
app.use('/api/remove-event', jwt_verification, remove_event)
app.use('/api/add-advertisement', jwt_verification, add_advertisement)
app.use('/api/remove-advertisement', jwt_verification, remove_advertisement)


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