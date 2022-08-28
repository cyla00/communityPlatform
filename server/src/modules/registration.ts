const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

import { openDbConnection } from './database'

const client = openDbConnection()

router.post('/', (req:any,res:any) => {
    
    interface user_data {
        email: String,
        username: String,
        password: String,
        birth_date: String,
        user_description: String,
        address: String,
        zip_code: String,
        city: String,
        country: String,
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
        profile_authority: String,
        user_video_clips: Array<Object>,
        status: String,
        registration_date: String,
        last_login_date: String,
    }


    try{
        client.connect(async (err:any, db:any) => {
            if(err) throw err

            const myDB = db.db(process.env.MONGO_DATABASE)

            myDB.collection('users').findOne({"email":req.body.email}).then((document:any) => {
                if(document) return res.sendStatus(409)
                myDB.collection('users').findOne({"username":req.body.username}).then((document:any) => {
                    if(document) return res.sendStatus(409)

                    let date = new Date()

                    let user_object :user_data = {
                        email: req.body.email, 
                        username: req.body.username,
                        password: req.body.password,
                        birth_date: req.body.birth_date,
                        user_description: '',
                        address: '',
                        zip_code: '',
                        city: '',
                        country: req.body.country,
                        security_code: uuidv4(),
                        steam_profile_link: '',
                        discord_username: '',
                        twitch_link: '',
                        youtube_link: '',
                        user_games: [],
                        user_rank: 1,
                        user_token_balance: 10,
                        user_referral_link: '',
                        user_referral_count: [],
                        profile_authority: 'default',
                        user_video_clips: [],
                        status: 'pending',
                        registration_date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                        last_login_date: '0',
                    }
        
                    myDB.collection('users').insertOne(user_object, (err:any, res:any) => {
                        if (err) throw err
                    })
    
                    interface view_method {
                        type: Number,
                        method: String,
                    }
    
                    const how_you_found_us :view_method = {
                        type: 1,
                        method: req.body.how_found_us
                    }
    
                    myDB.collection('platform_view_method').insertOne(how_you_found_us, (err:any, res:any) => {
                        if(err) throw err
                        db.close()
                    })

                    //send verification email here 

                    res.sendStatus(201)
                })
            })
        })
    }catch(err){
        console.log(err)
    }
})

export default router