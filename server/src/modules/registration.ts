const express = require('express')
const router = express.Router()

import { openDbConnection } from './database'

router.post('/', (req:any,res:any) => {

    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const birth_date = req.body.birth_date

    const user_description = ''
    const address = ''
    const zip_code = ''
    const city = ''
    const country = req.body.country
    const security_code = ''
    const steam_profile_link = ''
    const discord_username = ''
    const twitch_link = ''
    const youtube_link = ''
    const user_games = []
    const user_rank = ''
    const user_token_balance = ''
    const user_referral_link = ''
    const user_referral_count = ''
    const profile_authority = ''
    const user_video_clips = ''

    console.log(req.body)
    res.sendStatus(200)
})

export default router