const express = require('express')
const router = express.Router()
const SHA256 = require("crypto-js/sha256")
import { openDbConnection } from './database'
const client = openDbConnection()

router.post('/', async (req:any,res:any) => {

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const myDb = db.db(process.env.MONGO_DATABASE)
        const query = {id: req.body.id, password: SHA256(req.body.old_password).toString()}
        const newvalues = {$set : {password: SHA256(req.body.new_password).toString()}}

        await myDb.collection('users').updateOne(query, newvalues, {}).then((doc:any) => {
            if(doc.matchedCount < 1) return res.sendStatus(403)
            return res.sendStatus(200)
        }).catch((err:any) => {
            return res.sendStatus(403)
        })
    })
})

export default router