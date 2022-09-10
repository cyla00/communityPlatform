const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
import { openDbConnection } from './database'
const client = openDbConnection()

export let users:any
let userData :Array<Object> = []

router.post('/', async (req:any,res:any) => {

    await client.connect(async(err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const myDb = db.db(process.env.MONGO_DATABASE)
        
        await myDb.collection('users').find({}).toArray(async (err:any, users:any) => {
            
            if(err) {
                db.close()
                return console.log(err)
            }
            const array :Array<Object> = []
            users.forEach((element:any) => {
                array.push({
                    id: element.id,
                    email: element.email,
                    username: element.username,
                    user_rank: element.user_rank,
                    balance: element.user_token_balance,
                    avatar: element.avatar,
                    profile_banner: element.profile_banner,
                    user_referral_link: element.user_referral_link,
                    add_friend_code: element.add_friend_code,
                })
            })
            userData.splice(0, userData.length, ...array)
        })
    })

    myCache.set( "data", userData)
    users = myCache.take('data')
    return res.sendStatus(200)
})

export default router