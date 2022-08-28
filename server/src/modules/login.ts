const express = require('express')
const router = express.Router()
const SHA256 = require("crypto-js/sha256")
const jwt = require('jsonwebtoken')

import { openDbConnection } from './database'

const client = openDbConnection()

router.post('/', async (req:any,res:any) => {
    await client.connect(async (err:any, db:any) => {
        if(err) return res.sendStatus(500)
        const myDb = db.db(process.env.MONGO_DATABASE)

        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const [email, password] :string[] = Buffer.from(b64auth, 'base64').toString().split(':')

        await myDb.collection('users').findOne({email: SHA256(email).toString(), password: SHA256(password).toString()}).then(async (user:any) => {
            if(!user) return res.sendStatus(401)
            if(user.status === 'pending') return res.sendStatus(401)
            let myquery = {id: user.id}
            let date = new Date()
            let newvalues = {$set: {last_login_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`}}

            await myDb.collection('users').updateOne(myquery, newvalues, {}).then((document:any) => {

                if(document.acknowledged === false) return res.sendStatus(500)
                
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    country: user.country,
                    user_rank: user.user_rank,
                    authority: user.profile_authority,
                    status: user.status,
                    avatar: user.avatar,
                    profile_banner: user.profile_banner,
                    last_login: user.last_login_date,
                }, process.env.SECRET_KEY, {expiresIn: '6 hours'})

                return res.status(200).json({ access_token: token })
            })
        })
    })
})

export default router