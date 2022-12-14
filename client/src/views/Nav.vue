<script>
import {collapsed, toggleSidebar, sidebarWidth} from '@/components/state'
import SidebarLink from '@/components/SidebarLink.vue'
import SecHeader from '@/components/SecHeader.vue'
import PubBanners from '@/components/PubBanners.vue'
import TopRanking from '@/components/TopRanking.vue'
import DashMainInfo from '@/components/DashMainInfo.vue'
import Games from '@/components/Games.vue'
import Events from '@/components/Events.vue'
import Servers from '@/components/Servers.vue'
import calculateRank  from '@/views/calculateRank'

import jwt_decode from "jwt-decode"
const { io } = require("socket.io-client")
const axios = require('axios')

const socket = io('ws://localhost:3000', {
    reconnectionDelayMax: 10000,
    transports: ["websocket"],
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
    cors: {
        origin: "ws://localhost:3000",
    },
})

export default{
  name: 'Nav',
  components: {
    SidebarLink,
    DashMainInfo,
    SecHeader,
    PubBanners,
    TopRanking,
    DashMainInfo,
    Games,
    Events,
    Servers,
  },
  data(){
    return{
        collapsed,
        toggleSidebar,
        sidebarWidth,
        authority: localStorage.getItem('authority'),
        user_id: localStorage.getItem('id'),
        username: '',
        xp: 0,
        rank: 0,
        user_avatar: '',
        balance: 0,
        referral_link: '',
        vip: false,
        users: [],
        games: [],
        advertisings: [],
        events: [],
    }
  },
  methods: {
    reloadPage(){
        if (localStorage.getItem('reloaded')) {
            localStorage.removeItem('reloaded')
        } else {
            localStorage.setItem('reloaded', '1')
            location.reload()
        }
    },
    logout(){
        localStorage.clear()
        window.location.href = '/login'
    },
    async getUserData(){

        const data = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        await axios.post('http://localhost:3000/api/update-user-data', {}, data).catch((err) => {
            return
      })
    },
  },
  async created(){
        await this.getUserData()
        await socket.on('user_data', async (data) => {
            
            this.users.splice(0, this.users.length, ...data)

            let context_user = this.users.find(element => element.id === localStorage.getItem('id'))
            this.username = context_user.username
            this.rank = context_user.user_rank
            this.xp = context_user.user_xp
            this.rank = calculateRank(this.xp, this.rank)
            this.balance = context_user.balance
            this.referral_link = context_user.user_referral_link
            this.user_avatar = context_user.avatar
            this.vip = context_user.vip
        })
  }
}
</script>

<template>
    <div id="main">
        <div id="sidebar">
            <div>
                <div id="user-id-wrapper">
                    <div id="image-wrapper">
                        <img :src="user_avatar" alt="1080x1080 px">
                    </div>
                    <p id="username">{{username}}</p>
                    <p id="vip" v-if="this.vip"><i class='bx bx-diamond'></i>VIP</p>
                    <p id="rank" :class="{}"><i class='bx bxs-star bx-sm'></i> {{rank}}</p>
                </div>
            </div>
            <div id="sidebar-links-wrapper">
            <SidebarLink to="/admin" icon="bx bxs-check-shield bx-md" v-if="authority == 'admin'">Admin</SidebarLink>
            <SidebarLink to="/staff" icon="bx bx-donate-heart bx-md" v-if="authority == 'staff'">Staff</SidebarLink>
            <SidebarLink to="/profile" icon="bx bx-user bx-md">User</SidebarLink>
            <SidebarLink to="/community" icon="bx bxs-business bx-md">Community</SidebarLink>
            <SidebarLink to="/shop" icon="bx bx-store-alt bx-md">Shop</SidebarLink>
            <SidebarLink to="/bank" icon="bx bxs-bank bx-md">Bank</SidebarLink>
            <SidebarLink to="/contact-us" icon="bx bx-help-circle bx-md">Contact</SidebarLink>
            <SidebarLink id="logout-link" to="" icon="bx bx-log-out-circle bx-md" @click="logout()">Logout</SidebarLink>
            </div>
        </div>
        <div id="content-wrapper">
            <SecHeader/>
            <PubBanners/>

            <div class="info-wrapper">
                <DashMainInfo :balance="balance" :referral_link="referral_link"/>
                <TopRanking/>
            </div>

            <div class="game-wrapper">
                <Games/>
                <Servers/>
                <Events/>
            </div>

        </div>

        

    </div>
            
    
</template>

<style scoped>
:root{
    --nav-background: #26374B;
    --Content-wrapper-background: #233248;
    --content-card-background: #213248;
    --text-light: #d9d9d9;
    --logout-red: #ff605c;
    --mac-yellow: #ffbd44;
    --mac-green: #00ca4e;
    --lvl-text: #FF6FD8;
    --lvl-gradient-text-2:  #3813C2;
    --profile-border: #ff605c;
}

#content-wrapper{
    padding: 0.5em;
    margin-left: 12em;
}
.info-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5em;
    margin-top: 0.5em;
}

.game-wrapper{
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    row-gap: 0.5em;
    margin-top: 0.5em;
}

#vip{
    margin: auto;
    color: #FFD700;
    font-size: 0.8em;
}

#user-id-wrapper{
    padding: 1em;
    height: 6em;
}

#image-wrapper{
    margin: auto;
    height: 120px;
    width: 120px;
    border-radius: 100%;
    background: rgba(25, 53, 59, 0.5);
    overflow: hidden;
    border: solid 3px #00ca4e;
}
#image-wrapper img{
    max-width: 100%;
    max-height: 100%;
    background-size: contain;
    background-position: center;
    margin: 0;
    padding: 0;
}

#username{
    text-align: center;
    font-size: 0.9em;
    margin: auto;
    overflow: hidden;
}

#rank{
    margin-inline: 0;
    font-size: 30px;
    margin: auto;
    color: #FF6FD8;
}
.bxs-star{
    color: #66ffcc !important;
    margin: auto;
}

h1{
    position: absolute;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
}

#sidebar{
    width: 11em;
    background-color: #08090F;
    float: left;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
}

#sidebar-links-wrapper{
    margin: auto 0;
}

#logout-link{
    color: #ff605c;
    margin-top: 5em;
}

.collapsed-icon{
    position: absolute;
    bottom: 0;
    padding: 0.75em;

    transition: 0.2s linea;
}

.rotate-180{
    transform: rotate(180deg);
    transition: 0.2s linear;
}
.bx-chevrons-right{
    color: #c7ad65;
}
</style>

