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
                    subject: `${process.env.PLATFORM_NAME} ACCOUNT recovery`,
                    html: `
                    <div style="width: 100%; background: #161515; padding: 2em;">
                        <div style="width: 30%; margin: auto; padding: 1em;">
                            <img alt="hg" height="120" src="https://i.imgur.com/muqySE8.png" style="max-width: 100%; border-style: none; width: 325px; height: 120px;" width="123">
                        </div>
                        <div style="width: 30%; text-align: center; margin: auto; background: #ffffff; padding: 1em;">
                    
                            <h2 style="margin: 0; margin-bottom: 30px; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important;">Your password has been changed <span style="color: #00ca4e;">successfully</span></h2>
                            
                            <p style="margin: 0; margin-bottom: 30px; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300;">
                                <b>your account has been <span style="color: #00ca4e;">recovered successfully</span> and your <span style="color: #00ca4e;">password changed</span>.</b><br>
                            </p>
                    
                            <p style="margin: 0; margin-bottom: 30px; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300;">
                                <b>it wasn't you? please contact</b><br>
                                <a href="${process.env.WEBSITE_HOST}contact-us">Support</a>
                                as soon as possible
                            </p>
                        </div>
                    
                        <div style="width: 30%; background: #161515; text-align: start; margin: auto; padding: 1em;">
                            <p style="margin: 0; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 12px; margin-bottom: 5px;"><b>© 2022 [HG] HarderGamers</b></p>
                            <p style="margin: 0; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 12px; margin-bottom: 5px;"><a href="${process.env.WEBSITE_HOST}" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Website</a> <a href="https://discord.com/invite/ZgnVc9BuK4" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Discord</a></p>
                        </div>
                    </div>
                    `,
                    })
                }
                mailer()
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