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

        const myquery = {id: req.body.id}
        const newvalues = {$set: {user_rank: req.body.rank}}

        await myDb.collection('users').updateOne(myquery, newvalues, {}).catch(async (doc:any) => {
            console.log(doc)

            return res.sendStatus(200) 
        })
    })
})

export default router