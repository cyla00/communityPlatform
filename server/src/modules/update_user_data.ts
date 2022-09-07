const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
import { openDbConnection } from './database'
const client = openDbConnection()

export let bulk_data:any
let eventsData :Array<Object> = []
let userData :Array<Object> = []
let gamesData :Array<Object> = []
let promotionalBanners :Array<Object> = []


let fullData = {
    users: userData,
    games: gamesData,
    advertisings: promotionalBanners,
    events: eventsData,
}



router.post('/', async (req:any,res:any) => {

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const myDb = db.db(process.env.MONGO_DATABASE)
        
        myDb.collection('users').find({}).toArray(async (err:any, users:any) => {
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
        
        
        myDb.collection('games').find({}).toArray(async (err:any, games:any) => {
            if(err) {
                db.close()
                return console.log(err)
            }
            gamesData.splice(0, gamesData.length, ...games)    
        })


        myDb.collection('advertisings').find({}).toArray(async (err:any, advertisings:any) => {
            if(err) {
                db.close()
                return console.log(err)
            }       
            promotionalBanners.splice(0, promotionalBanners.length, ...advertisings)
        })


        myDb.collection('events').find({}).toArray(async (err:any, events:any) => {    
            if(err) {
                db.close()
                return console.log(err)
            } 
            eventsData.splice(0, eventsData.length, ...events)
        })


        

    })

    bulk_data = myCache.take('data')
    myCache.set( "data", fullData)
    return res.sendStatus(200)
})

export default router