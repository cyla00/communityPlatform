const express = require('express')
const router = express.Router()
import { openDbConnection } from './database'
var ObjectID = require('mongodb').ObjectID

const client = openDbConnection()

router.get('/:id', async (req:any,res:any) => {

    await client.connect( async (err:any, db:any) => {
        if(err) throw err

        const myDB = db.db(process.env.MONGO_DATABASE) 

        let myquery = {id: req.params.id}
        let newvalues = {$set: {status: "active"}}

        await myDB.collection('users').updateOne(myquery, newvalues, {}).then((document:any) => {   
            if(document.modifiedCount === 0) return res.status(403).send('An error occurred, please retry later')
            db.close()
            res.status(200).send('confirmed')
        })
    })
})

export default router