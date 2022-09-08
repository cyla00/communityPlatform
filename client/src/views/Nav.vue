<script>
import {collapsed, toggleSidebar, sidebarWidth} from '../components/state'
import SidebarLink from '../components/SidebarLink.vue'
import SecHeader from '../components/SecHeader.vue'
import PubBanners from '../components/PubBanners.vue'
import TopRanking from '../components/TopRanking.vue'
import DashMainInfo from '../components/DashMainInfo.vue'
import Games from '../components/Games.vue'
import Friends from '../components/Friends.vue'

import jwt_decode from "jwt-decode"
const { io } = require("socket.io-client")
const axios = require('axios')

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
    Friends,
  },
  data(){
    return{
        collapsed,
        toggleSidebar,
        sidebarWidth,
        authority: localStorage.getItem('authority'),
        user_id: localStorage.getItem('id'),
        username: '',
        rank: 0,
        user_avatar: '',
        balance: 0,
        referral_link: '',
        users: [],
        games: [],
        advertisings: [],
        events: [],
    }
  },
  methods: {
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
    async update(){
        var socket = io('http://localhost:3000', {transports: ['websocket']})
        

        socket.on('user_data', async (data) => {
            await this.getUserData()
            this.users.splice(0, this.users.length, ...data)

            let context_user = this.users.find(element => element.id === localStorage.getItem('id'))
            this.username = context_user.username
            this.rank = context_user.user_rank
            this.balance = context_user.balance
            this.referral_link = context_user.user_referral_link
            this.user_avatar = context_user.avatar
        })
    }
  },
  async created(){
    const socket = io('http://localhost:3000', {transports: ['websocket'], upgrade: false})
    await this.getUserData()          
        socket.on('user_data', async (data) => {
            await this.getUserData()
            this.users.splice(0, this.users.length, ...data)

            let context_user = this.users.find(element => element.id === localStorage.getItem('id'))
            this.username = context_user.username
            this.rank = context_user.user_rank
            this.balance = context_user.balance
            this.referral_link = context_user.user_referral_link
            this.user_avatar = context_user.avatar
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
                    <p id="rank" :class="{}"><i class='bx bxs-star bx-sm'></i> {{rank}}</p>
                </div>
            </div>
            <div id="sidebar-links-wrapper">
            <SidebarLink to="/admin" icon="bx bxs-check-shield bx-md" v-if="authority == 'admin'">Admin</SidebarLink>
            <SidebarLink to="/staff" icon="bx bx-donate-heart bx-md" v-if="authority == 'staff'">Staff</SidebarLink>
            <SidebarLink to="/profile" icon="bx bx-user bx-md">User</SidebarLink>
            <SidebarLink to="/shop" icon="bx bx-store-alt bx-md">Shop</SidebarLink>
            <SidebarLink to="/" icon="bx bx-home bx-md">Home</SidebarLink>
            <SidebarLink to="/contact-us" icon="bx bx-help-circle bx-md">Contact</SidebarLink>
            <SidebarLink id="logout-link" to="" icon="bx bx-log-out-circle bx-md" @click="logout()">Logout</SidebarLink>
            </div>
        </div>
        <button @click="update()">wawdawd</button>
        <div id="content-wrapper">
            <SecHeader/>
            <PubBanners/>

            <div class="info-wrapper">
                <DashMainInfo :balance="balance" :referral_link="referral_link"/>
                <TopRanking/>
            </div>

            <div class="game-wrapper">
                <Games/>
                <Friends/>
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
    grid-template-rows: 1fr 1fr;
    column-gap: 0.5em;
    margin-top: 0.5em;
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
    font-size: 17px;
    margin-inline: 0;
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
    background-color: #1F2133;
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

