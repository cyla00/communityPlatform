const express = require('express')
const router = express.Router()
import { openDbConnection } from './database'
const client = openDbConnection()


router.post('/', async (req:any,res:any) => { 
    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const myDb = db.db(process.env.MONGO_DATABASE)

        await myDb.collection('users').findOne({id: req.body.id}).then((user:any) => {
            if(!user){
                db.close()
                return res.sendStatus(401)
            }
            return res.status(200).send({rank: user.user_rank})
        }).catch((err:any) => {
            db.close()
            return res.sendStatus(401)
        })
    })
})

export default router