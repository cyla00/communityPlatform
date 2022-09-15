const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
import { openDbConnection } from './database'
const client = openDbConnection()
const { v4: uuidv4 } = require('uuid')
import jwt_decode from 'jwt-decode'



router.post('/', async (req:any,res:any) => {
    const token = req.headers['authorization'].split(' ')[1]
        
    const rawToken = jwt_decode<any>(token)

    if(rawToken.authority != 'admin') return res.sendStatus(403)
    

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }


        const myDb = db.db(process.env.MONGO_DATABASE)

        const myquery = {id: uuidv4(), title: req.body.title, host: req.body.host, port: req.body.port}
        await myDb.collection('servers').insertOne(myquery).then((document:any) => {
            if(!document.acknowledged) {
                db.close()
                return res.status(403).send({error_message: 'An error occurred, please retry later'})
            }

            db.close()
            return res.status(200).send({success_message: 'Successfully added a server'})
        })
    }) 
})

export default router