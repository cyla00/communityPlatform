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

        const validateEmail = (email:string) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
          }
        if(!validateEmail(req.body.email)) return res.sendStatus(403)
      
        const query = {id: req.body.id}
        const newvalues = {$set : { 
            address: req.body.address, 
            city: req.body.city, 
            zip_code: req.body.zip_code, 
            country: req.body.country, 
            steam_link: req.body.steam_link, 
            discord_user: req.body.discord_user, 
            twitch_channel: req.body.twitch_channel, 
            youtube_channel: req.body.youtube_channel,
        }}

        await myDb.collection('users').updateOne(query, newvalues, {}).then((doc:any) => {
            if(doc.matchedCount < 1) return res.status(403).send({error_message: 'Failed to update changes'})
            return res.sendStatus(200)
        }).catch((err:any) => {
            return res.status(403).send({error_message: 'Failed to update changes'})
        })
    })
})

export default router