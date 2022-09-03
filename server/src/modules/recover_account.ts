const express = require('express')
const router = express.Router()
const path = require('path')
const SHA256 = require("crypto-js/sha256")
const nodemailer = require("nodemailer")
import { openDbConnection } from './database'

const client = openDbConnection()

router.post('/', async (req:any,res:any) => {

    await client.connect( async (err:any, db:any) => {
        if(err) res.sendStatus(200)

        const myDB = db.db(process.env.MONGO_DATABASE) 

        let myquery = {email: SHA256(req.body.email).toString(), security_code: req.body.secret_key}

        await myDB.collection('users').findOne(myquery).then((document:any) => { 

            if(!document) return res.status(200).send({success_message: 'Check your EMAIL INBOX to restore your account! redirectig in 5s...'})

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
                to: req.body.email,
                subject: `${process.env.PLATFORM_NAME} account recovery`,
                html: `
                    <h1 style="">Please follow the link to recover your account</h1>
                    <a style="margin:auto; color:blue;" href='http://localhost:8081/reset-password/${document.id}/${document.security_code}'>Reset password</a>
                `,
                })
            }
            mailer().then(() => {
                db.close()
                return res.status(200).send({success_message: 'Check your EMAIL INBOX to restore your account! redirectig in 5s...'})
            }).catch((err:any) => {
                if(err) {
                    db.close()
                    return res.status(200).send({success_message: 'Check your EMAIL INBOX to restore your account! redirectig in 5s...'})
                }
            })
        }).catch((err:any) => {
            db.close()
            return res.status(200).send({success_message: 'Check your EMAIL INBOX to restore your account! redirectig in 5s...'})
        })
    })
})

export default router