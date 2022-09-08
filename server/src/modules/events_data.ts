const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
import { openDbConnection } from './database'
const client = openDbConnection()

// export let advertisements:any
export let eventsData :Array<Object> = []

router.post('/', async (req:any,res:any) => {

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const myDb = db.db(process.env.MONGO_DATABASE)

        await myDb.collection('events').find({}).toArray(async (err:any, events:any) => {
            if(err) {
                db.close()
                return console.log(err)
            }       
            eventsData.splice(0, eventsData.length, ...events)
        })
    })

    eventsData = myCache.take('data')
    myCache.set( "data", eventsData)
    return res.sendStatus(200)
})

export default router