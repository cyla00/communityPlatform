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

        const data = {id: req.body.id, security_code: SHA256(req.body.key).toString()}
        
        await myDB.collection('users').findOne(data).then(async (doc:any) => {
            
            if(!doc) {
                db.close()
                return res.status(403).send({error: 'Reset failed, plese contact support'})
            }
            
            const email_address = doc.email

            const myquery = {id: req.body.id, security_code: SHA256(req.body.key).toString()}
            const new_key = uuidv4()
            const new_hashed_key = SHA256(new_key).toString()
            const newvalues = {$set: {id: uuidv4(), password: SHA256(req.body.new_pass).toString(), security_code: new_hashed_key}}
        
            await myDB.collection('users').updateOne(myquery, newvalues, {}).then(async (document:any) => {   
                if(document.modifiedCount === 0) {
                    db.close()
                    return res.status(403).send({error: 'Reset failed, please contact support'})
                }
                async function mailer(){
                    var transporter = nodemailer.createTransport({
                        service: 'Mail.ru',
                        secure: false,
                        auth: {
                            user: process.env.MAIL, 
                            pass: process.env.MAIL_PASS,
                        }, 
                    })
                
                    await transporter.sendMail({
                    from: process.env.MAIL,
                    to: email_address,
                    subject: `${process.env.PLATFORM_NAME} account recovery`,
                    html: `
                        <h1 style="">Your password has been changed successfully</h1>
                        <p>your account has been recovered successfully and your password changed</p>
                        <p>it wasn't you? please contact <a href="http://localhost:8080/contact-us">Support</a> as soon as possible</p>
                    `,
                    })
                }
                mailer()
                db.close()
                return res.status(200).send({success: 'Password successfully changed, login to your account', key: new_key})
            })

        }).catch((err:any) => {
            console.log(err);
            
            db.close()
            return res.status(403).send({error: 'Reset failed, plese contact support'})
        })
    })
})

export default router