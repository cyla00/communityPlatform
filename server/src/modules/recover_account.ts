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

        let myquery = {email: req.body.email, security_code: SHA256(req.body.secret_key).toString()}

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
                subject: `[HG]${process.env.PLATFORM_NAME} account recovery`,
                html: `
                    <div style="width: 100%; background: #161515; padding: 2em;">
                        <div style="width: 30%; margin: auto; padding: 1em;">
                            <img alt="hg" height="120" src="https://i.imgur.com/muqySE8.png" style="max-width: 100%; border-style: none; width: 325px; height: 120px;" width="123">
                        </div>
                        <div style="width: 30%; text-align: center; margin: auto; background: #ffffff; padding: 1em;">

                            <h2 style="margin: 0; margin-bottom: 30px; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important;">Password Reset</h2>
                            
                            <p style="margin: 0; margin-bottom: 30px; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300;">
                                <b>You just requested a Password Reset.</b><br>
                                If you have requested this password change click the button below! 
                                </p>
                                <a href="http://localhost:8080/reset-password/${document.id}/${req.body.secret_key}" style="font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; border-color: #348eda; font-weight: 400; text-decoration: none; display: inline-block; margin: 0; color: #ffffff; background-color: #990073; border-radius: 2px; cursor: pointer; font-size: 14px; padding: 12px 45px;" target="_blank"><b>Reset your password</b></a>
                                
                                <p style="margin: 1em; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 12px; margin-bottom: 5px;">If you have "NOT" requested a password change, <a href="${process.env.WEBSITE_HOST}contact-us" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none;" target="_blank"><b>Contact support</b></a></p>         
                        </div>

                        <div style="width: 30%; background: #161515; text-align: start; margin: auto; padding: 1em;">
                            <p style="margin: 0; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 12px; margin-bottom: 5px;"><b>© 2022 [HG] HarderGamers</b></p>
                            <p style="margin: 0; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 12px; margin-bottom: 5px;"><a href="${process.env.WEBSITE_HOST}" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Website</a> <a href="https://discord.com/invite/ZgnVc9BuK4" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Discord</a></p>
                        </div>
                    </div>
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