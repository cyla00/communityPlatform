const express = require('express')
const router = express.Router()
const path = require('path')
const SHA256 = require("crypto-js/sha256")
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer')
import { openDbConnection } from './database'

const client = openDbConnection()

router.post('/', async (req:any,res:any) => {
    
    await client.connect( async (err:any, db:any) => {
        if(err) {
            db.close()
            return res.sendStatus(500)
        }

        const myDB = db.db(process.env.MONGO_DATABASE) 

        const data = {id: req.body.id, security_code: req.body.key}
        
        await myDB.collection('users').findOne(data).then(async (doc:any) => {
            if(!doc) {
                db.close()
                return res.status(403).send({error: 'Reset failed, plese contact support'})
            }

            const myquery = {id: req.body.id, security_code: req.body.key}
            const new_key = uuidv4()
            const newvalues = {$set: {id: uuidv4(), password: SHA256(req.body.new_pass).toString(), security_code: new_key}}
        
            await myDB.collection('users').updateOne(myquery, newvalues, {}).then(async (document:any) => {   
                if(document.modifiedCount === 0) {
                    db.close()
                    return res.status(403).send({error: 'Reset failed, please contact support'})
                }
                db.close()
                return res.status(200).send({success: 'Password successfully changed, login to your account', key: new_key})
            })

        }).catch((err:any) => {
            db.close()
            return res.status(403).send({error: 'Reset failed, plese contact support'})
        })
    })
})

export default router