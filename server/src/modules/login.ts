const express = require('express')
const router = express.Router()
const SHA256 = require('crypto-js/sha256')
const jwt = require('jsonwebtoken')

import { isRegularExpressionLiteral } from 'typescript'
import { openDbConnection } from './database'

const client = openDbConnection()

router.post('/', async (req:any,res:any) => {
    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }
        const myDb = db.db(process.env.MONGO_DATABASE)

        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const [email, password] :string[] = Buffer.from(b64auth, 'base64').toString().split(':')

        await myDb.collection('users').findOne({email: email, password: SHA256(password).toString()}).then(async (user:any) => {
            if(!user){
                db.close()
                return res.status(401).send({error: 'Incorrect credentials'})
            }
            if(user.status === 'pending') return res.status(401).send({error: 'Please verify your email before login'})
            let myquery = {id: user.id}
            let date = new Date()
            let newvalues = {$set: {last_login_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`}}

            await myDb.collection('users').updateOne(myquery, newvalues, {}).then((document:any) => {
                if(document.acknowledged === false){
                    db.close()
                    return res.sendStatus(500)
                }

                
                if(user.is_admin) {
                    const token = jwt.sign({
                        id: user.id,
                        last_login: user.last_login_date,
                        is_admin: user.is_admin,
                        is_staff: user.is_staff,
                        authority: 'admin'
                    }, process.env.SECRET_KEY, {expiresIn: '3 hours'})
                    return res.status(200).json({ access_token: `${token}` })
                }

                if(user.is_staff) {
                    const token = jwt.sign({
                        id: user.id,
                        last_login: user.last_login_date,
                        is_admin: user.is_admin,
                        is_staff: user.is_staff,
                        authority: 'staff'
                    }, process.env.SECRET_KEY, {expiresIn: '3 hours'})
                    return res.status(200).json({ access_token: `${token}` })
                }

                const token = jwt.sign({
                    id: user.id,
                    last_login: user.last_login_date,
                    is_admin: user.is_admin,
                    is_staff: user.is_staff,
                    authority: 'user'
                }, process.env.SECRET_KEY, {expiresIn: '3 hours'})

                 
                return res.status(200).json({ access_token: `${token}` })
            })
        })
    })
})

export default router