const express = require('express')
const nodemailer = require("nodemailer")
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const SHA256 = require("crypto-js/sha256")

import { openDbConnection } from './database'

const client = openDbConnection()

router.post('/', (req:any,res:any) => {
    
    interface user_data {
        id: String,
        add_friend_code: String,
        email: String,
        username: String,
        avatar: String,
        profile_banner: String,
        password: String,
        birth_date: String,
        user_description: String,
        address: String,
        zip_code: String,
        city: String,
        country: String,
        country_flag: String,
        security_code: String,
        steam_profile_link: String,
        discord_username: String,
        twitch_link: String,
        youtube_link: String,
        user_games: Array<String>,
        user_rank: Number,
        user_token_balance: Number,
        user_referral_link: String,
        user_referral_count: Array<Object>,
        is_admin: Boolean,
        is_staff: Boolean,
        user_video_clips: Array<Object>,
        status: String,
        registration_date: String,
        last_login_date: String,
        friends_list: Array<Object>,
    }


    client.connect(async (err:any, db:any) => {
        if(err) throw err

        const myDB = db.db(process.env.MONGO_DATABASE)

        const validateEmail = (email:string) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
          }
        if(!validateEmail(req.body.email)) return res.status(401).send({error: 'email not valid'})

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
            subject: `Thanks for joining ${process.env.PLATFORM_NAME}!`,
            html: `
            <div style="width: 100%; background: #161515; padding: 2em;">
                <div style="width: 80%; margin: auto; padding: 1em;">
                    <img alt="hg" height="120" src="https://i.imgur.com/muqySE8.png" style="max-width: 100%; border-style: none; width: 325px; height: 120px;" width="123">
                </div>
                <div style="width: 30%; text-align: center; margin: auto; background: #ffffff; padding: 1em;">
            
                    <h2 style="margin: 0; margin-bottom: 30px; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important;">Welcome to HarderGamers</h2>
                    
                    <p style="margin: 0; margin-bottom: 30px; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300;">
                        <b>We are delighted to have a new member in the family.</b><br>
                        </p>
                        <a href="${process.env.WEBSITE_HOST}" style="font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; border-color: #348eda; font-weight: 400; text-decoration: none; display: inline-block; margin: 0; color: #ffffff; background-color: #990073; border-radius: 2px; cursor: pointer; font-size: 14px; padding: 12px 45px;" target="_blank"><b>Go to website</b></a>  
                </div>
            
                <div style="width: 30%; background: #161515; text-align: start; margin: auto; padding: 1em;">
                    <p style="margin: 0; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 12px; margin-bottom: 5px;"><b>© 2022 [HG] HarderGamers</b></p>
                    <p style="margin: 0; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 12px; margin-bottom: 5px;"><a href="${process.env.WEBSITE_HOST}" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Website</a> <a href="https://discord.com/invite/ZgnVc9BuK4" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Discord</a></p>
                </div>
            </div>
            `,
            })
        }
        mailer().then(async () => {
            await myDB.collection('users').findOne({"email":req.body.email}).then(async (document:any) => {
                if(document) return res.status(401).send({error: 'email already exists'})
                
    
                await myDB.collection('users').findOne({"username":req.body.username}).then(async (document:any) => {
                    if(document) {
                        db.close()
                        return res.status(401).send({error: 'username already exists'})
                    }
    
                    let date = new Date()
                    const key = uuidv4()
                    const hashed_key = SHA256(key).toString()
                    let user_object :user_data = {
                        id: uuidv4(),
                        add_friend_code: uuidv4(),
                        email: req.body.email, 
                        username: req.body.username,
                        avatar: 'https://i.ibb.co/Y83nLm3/e9umssf3v5c21.png',
                        profile_banner: './banners/default_banner.png',
                        password: SHA256(req.body.password).toString(),
                        birth_date: req.body.birth_date,
                        user_description: '',
                        address: '',
                        zip_code: '',
                        city: '',
                        country: req.body.country,
                        country_flag: req.body.country_flag,
                        security_code: hashed_key,
                        steam_profile_link: '',
                        discord_username: '',
                        twitch_link: '',
                        youtube_link: '',
                        user_games: [],
                        user_rank: 1,
                        user_token_balance: req.body.balance || 0,
                        user_referral_link: `${process.env.WEBSITE_HOST}referral/${uuidv4()}`,
                        user_referral_count: [],
                        is_admin: false,
                        is_staff: false,
                        user_video_clips: [],
                        status: 'pending',
                        registration_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                        last_login_date: '0',
                        friends_list: [],
                    }
            
                    await myDB.collection('users').insertOne(user_object, (err:any, doc:any) => {
                        if (err){
                            db.close()
                            return res.status(500).send({error: 'The email you used is not valid, please change it'})
                        }
                    })
        
                    interface view_method {
                        type: Number,
                        method: String,
                    }
        
                    const how_you_found_us :view_method = {
                        type: 1,
                        method: req.body.how_found_us
                    }
        
                    await myDB.collection('platform_view_method').insertOne(how_you_found_us, (err:any, doc:any) => {
                        if(err){
                            db.close()
                            return res.status(500).send({error: 'The email you used is not valid, please change it'})
                        }
                    })
    
                        //send verification email here 
    
                    await myDB.collection('users').findOne({"email": req.body.email}).then((doc:any) => {
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
                            subject: `${process.env.PLATFORM_NAME} account verification`,
                            html: `
                            <div style="width: 100%; background: #161515; padding: 2em;">

                                <div style="width: 30%; margin: auto; padding: 1em;">
                                    <img alt="hg" height="120" src="https://i.imgur.com/muqySE8.png" style="max-width: 100%; border-style: none; width: 325px; height: 120px;" width="123">
                                </div>
                                <div style="width: 30%; text-align: center; margin: auto; background: #ffffff; padding: 1em;">
                            
                                    <h2 style="margin: 0; margin-bottom: 30px; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important;">You're on your way!<br>
                                        Let's confirm your email address.
                                    </h2>
                                    
                                    <p style="margin: 0; margin-bottom: 30px; color: #294661; font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300;">
                                        <b>Please verify you account before login.</b> <br>
                                        By clicking on the following link, you are confirming your email address and agreeing to <b>HarderGamers</b> 
                                        <a href="${process.env.WEBSITE_HOST}contact-us" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none;" target="_blank"><b>Terms of Service</b></a>.
                                        </p>
                            
                                        <a href="${process.env.WEBSITE_HOST}api/verify-email/${doc.id}" style="font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; box-sizing: border-box; border-color: #348eda; font-weight: 400; text-decoration: none; display: inline-block; margin: 0; color: #ffffff; background-color: #990073; border-radius: 2px; cursor: pointer; font-size: 14px; padding: 12px 45px;" target="_blank"><b>Confirm Your Account</b></a>
                                        
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
                            res.status(201).send({security_key: key})
                        }).catch((err:any) => {
                            if(err) {
                                console.log(err);
                                
                                db.close()
                                return res.status(401).send({error: 'An error occurred, contact support for help'})
                            }
                        })
                    })
                })
            })
        }).catch((err:any) => {
            if(err) {
                db.close()
                return res.status(401).send({error: 'The email you used is not valid, please change it'})
            }
        })
    })
})

export default router