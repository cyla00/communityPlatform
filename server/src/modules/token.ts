const express = require('express')
const router = express.Router()

router.post('/', async (req:any,res:any) => { 
    res.sendStatus(200)
})

export default router