const express = require('express')
const router = express.Router()
import { openDbConnection } from './database'
const path = require('path')

const client = openDbConnection()

router.get('/:id', async (req:any,res:any) => {

    await client.connect( async (err:any, db:any) => {
        if(err) throw err

        const myDB = db.db(process.env.MONGO_DATABASE) 

        let myquery = {id: req.params.id}
        let newvalues = {$set: {status: "active"}}

        await myDB.collection('users').updateOne(myquery, newvalues, {}).then((document:any) => {   
            if(document.modifiedCount === 0) return res.status(403).sendFile(path.join(__dirname, '../pages/email_error.html'))
            db.close()
            res.status(200).sendFile(path.join(__dirname, '../pages/email_verification.html'))
        })
    })
})

export default router