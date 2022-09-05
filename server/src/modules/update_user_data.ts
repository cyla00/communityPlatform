const express = require('express')
const router = express.Router()
import { createClient } from 'redis'
const redis = createClient({url: process.env.REDIS_URL})

import { openDbConnection } from './database'
const client = openDbConnection()


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
            const jsonifiedData = JSON.stringify(data)
            console.log(jsonifiedData)
            
            redis.on('error', (err:any) => {return res.sendStatus(401)})
            await redis.connect()
            await client.set('data', jsonifiedData)
            
            return res.sendStatus(200)  
        })
    })
})

export default router