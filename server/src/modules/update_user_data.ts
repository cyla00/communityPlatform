const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()

import { openDbConnection } from './database'
const client = openDbConnection()

export let user_data:any

router.post('/', async (req:any,res:any) => { 
    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const myDb = db.db(process.env.MONGO_DATABASE)

        await myDb.collection('users').find({}).toArray(async (err:any, data:any) => {
            if(err) {
                db.close()
                return console.log(err)
            }   
            
            if(!data){
                db.close()
                return res.sendStatus(401)
            }

            const userData :Array<Object> = []

            data.forEach((element:any) => {
                console.log(element);
                userData.push({
                    id: element.id,
                    email: element.email,
                    username: element.username,
                    avatar: element.avatar,
                    profile_banner: element.profile_banner,
                    birth_date: element.birth_date,
                    user_description: element.user_description,
                    country_flag: element.country_flag,
                    user_games: element.user_games,
                    user_rank: element.user_rank,
                    user_token_balance: element.user_token_balance,
                    user_referral_link: element.user_referral_link,
                    user_referral_count: element.user_referral_count,
                    last_login_date: element.last_login_date,
                    friends_list: element.friends_list,
                })
            })

            myCache.set( "data", userData)
            user_data = myCache.take('data')
            
            return res.sendStatus(200)  
        })
    })
})

export default router