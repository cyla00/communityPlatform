const express = require('express')
const router = express.Router()

router.post('/', (req:any,res:any) => {
    res.send('registration page')
})

export default router