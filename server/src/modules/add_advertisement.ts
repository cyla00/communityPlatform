const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" )
const myCache = new NodeCache()
import { openDbConnection } from './database'
const client = openDbConnection()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
import jwt_decode from 'jwt-decode'

var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
      cb(null, './advertisements')
    },
    filename: function (req:any, file:any, cb:any) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


router.post('/', upload.single('file'), async (req:any,res:any) => {
    if(!req.file) return res.sendStatus(501)
    
    const token = req.headers['authorization'].split(' ')[1]
        
    const rawToken = jwt_decode<any>(token)

    if(rawToken.authority != 'admin') return res.sendStatus(403)
    
    const filePath = `${process.env.WEBSITE_HOST}advertisements/${req.file.originalname}`

    await client.connect(async (err:any, db:any) => {
        if(err){
            db.close()
            return res.sendStatus(500)
        }


        const myDb = db.db(process.env.MONGO_DATABASE)
        const title = req.file.originalname.split('.')[0]
        var d = new Date()
        d.setMonth(d.getMonth() + 1)

        const myquery = {id: uuidv4(), title: title, image: filePath, expiration: d}
        await myDb.collection('advertisings').insertOne(myquery).then((document:any) => {
            if(!document.acknowledged) {
                db.close()
                return res.status(403).send({error_message: 'An error occurred, please retry later'})
            }
            db.close()
            return res.status(200).send({success_message: 'Successfully added a pub'})
        })
    }) 
})

export default router