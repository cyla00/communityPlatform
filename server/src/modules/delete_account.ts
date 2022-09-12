const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
import { textChangeRangeIsUnchanged } from 'typescript'
import { openDbConnection } from './database'
const client = openDbConnection()

router.post('/', async (req:any,res:any) => {

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const myDb = db.db(process.env.MONGO_DATABASE)
      
        const query = {id: req.body.id}

        await myDb.collection('users').deleteOne(query).then((doc:any) => {
            if(doc.deletedCount > 1 ) return res.status(403).send({error_message: 'Failed delete your account'})
            return res.sendStatus(200)
        }).catch((err:any) => {
            return res.status(403).send({error_message: 'Failed delete your account'})
        })
    })
})

export default router