const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
import { openDbConnection } from './database'
const client = openDbConnection()
const { v4: uuidv4 } = require('uuid')
import jwt_decode from 'jwt-decode'

router.post('/', async (req:any,res:any) => {
    if(!req.body) return res.sendStatus(501)
    
    const token = req.headers['authorization'].split(' ')[1]
        
    const rawToken = jwt_decode<any>(token)

    if(rawToken.authority != 'admin') return res.sendStatus(403)

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }


        const myDb = db.db(process.env.MONGO_DATABASE)

        const myquery = {id: req.body.id}
        await myDb.collection('advertisings').deleteOne(myquery, {}, {}).then((document:any) => {
            
            if(document.deletedCount < 1) {
                db.close()
                return res.status(403).send({error_message: 'An error occurred, please retry later'})
            }
            db.close()
            return res.status(200).send({success_message: 'Successfully removed a pub'})
        })
    }) 
})

export default router