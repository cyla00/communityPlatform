const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
import { openDbConnection } from './database'
const client = openDbConnection()
const multer = require('multer')
import jwt_decode from 'jwt-decode'

var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
      cb(null, './images')
    },
    filename: function (req:any, file:any, cb:any) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


router.post('/', upload.single('file'), async (req:any,res:any) => {
    if(!req.file){
        return res.sendStatus(501)
    }
    
    const filePath = `${process.env.WEBSITE_HOST}images/${req.file.originalname}`;

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }

        const token = req.headers['authorization'].split(' ')[1]
        
        const rawToken = jwt_decode<any>(token)
        
        const myDb = db.db(process.env.MONGO_DATABASE)

        const myquery = {id: rawToken.id}
        const newvalues = {$set: {avatar: filePath}}
        await myDb.collection('users').updateOne(myquery, newvalues, {}).then((document:any) => {
            return res.sendStatus(200)
        })
        
    }) 
})

export default router