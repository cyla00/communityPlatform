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
                <h1 style="">we hope you will have the best game experience with us!</h1>
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
                        email: req.body.email, 
                        username: req.body.username,
                        avatar: './avatars/default_avatar.png',
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
                        user_token_balance: 10,
                        user_referral_link: '',
                        user_referral_count: [],
                        is_admin: false,
                        is_staff: false,
                        user_video_clips: [],
                        status: 'pending',
                        registration_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                        last_login_date: '0',
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
                                <h1 style="">Please verify you account before login</h1>
                                <a style="margin:auto; color:blue;" href='${process.env.WEBSITE_HOST}api/verify-email/${doc.id}'>Verify your account</a>
                            `,
                            })
                        }
                        mailer().then(() => {
                            db.close()
                            res.status(201).send({security_key: key})
                        }).catch((err:any) => {
                            if(err) {
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