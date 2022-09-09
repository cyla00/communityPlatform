const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
import { openDbConnection } from './database'
const client = openDbConnection()

router.post('/', async (req:any,res:any) => {

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const myDb = db.db(process.env.MONGO_DATABASE)

        await myDb.collection('advertisings').find({}).toArray(async (err:any, advertisings:any) => {
            if(err) {
                db.close()
                return console.log(err)
            }
        
            return res.status(200).send(advertisings) 
        })
        })
})
export default router