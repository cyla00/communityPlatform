const express = require('express')
const router = express.Router()

router.post('/', (req:any,res:any) => {
    //
    res.sendStatus(200)
})

export default router