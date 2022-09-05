<script>
import {collapsed, toggleSidebar, sidebarWidth} from './state'
import SidebarLink from './SidebarLink.vue'
import jwt_decode from "jwt-decode"
const { io } = require("socket.io-client")
const axios = require('axios')

export default{
  name: 'Nav',
  components: {
    SidebarLink,
  },
  data(){
    return{
        collapsed,
        toggleSidebar,
        sidebarWidth,
        authority: localStorage.getItem('authority'),
        user_id: localStorage.getItem('id'),
        username: jwt_decode(localStorage.getItem('token')).username,
        rank: undefined,
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

        await axios.post('http://localhost:3000/api/update-user-data', {}, data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
            return
      })
    },
  },
  created(){
      const socket = io('http://localhost:3000', {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            },
        })
        socket.on('connect', (data) => {
            console.log('connected')
        })

        socket.on('data', function(data) {
            console.log(data)
            socket.disconnect()
        })
  }
}
</script>

<template>

            
    <div id="sidebar" :style="{width: sidebarWidth}">
        <div>
            <transition name="fade">
                <div v-if="!collapsed" id="user-id-wrapper">
                    <div id="image-wrapper">
                        <img src="../../public/test.jpg" alt="1080x1080 px">
                    </div>
                    <div id="status-wrapper"></div>
                    <p id="username">{{username}}</p>
                    <p id="rank"><i class='bx bxs-star bx-sm'></i>{{rank}}</p>
                </div>
            </transition>
        </div>
        <div id="sidebar-links-wrapper">
            <SidebarLink to="/admin" icon="bx bxs-check-shield bx-md" v-if="authority == 'admin'">Admin</SidebarLink>
            <SidebarLink @click="getUserData()" to="/staff" icon="bx bx-donate-heart bx-md" v-if="authority == 'staff'">Staff</SidebarLink>
            <SidebarLink to="/dashboard" icon="bx bxs-dashboard bx-md">Dashboard</SidebarLink>
            <SidebarLink to="/profile" icon="bx bx-user bx-md">User</SidebarLink>
            <SidebarLink to="/games" icon="bx bx-play-circle bx-md">Games</SidebarLink>
            <SidebarLink to="/bank" icon="bx bxs-bank bx-md">Bank</SidebarLink>
            <SidebarLink to="/shop" icon="bx bx-store-alt bx-md">Shop</SidebarLink>
            <SidebarLink id="logout-link" to="" icon="bx bx-log-out-circle bx-md" @click="logout()">Logout</SidebarLink>
        </div>

        <span class="collapsed-icon" @click="toggleSidebar" :class="{'rotate-180': collapsed}">
            <i class='bx bx-chevrons-right bx-md'></i>
        </span>
    </div>
</template>

<style scoped>
:root{
    --nav-background: ;
    --text-light: #d9d9d9;
    --logout-red: #ff605c;
    --mac-yellow: #ffbd44;
    --mac-green: #00ca4e;
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
}
#image-wrapper img{
    max-width: 100%;
    max-height: 100%;
    background-size: contain;
    background-position: center;
    margin: 0;
    padding: 0;
}

#status-wrapper{
    position: relative;
    margin: auto;
    top: -20px;
    right: -30px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: #00ca4e;
}
#username{
    font-size: 20px;
    margin: 0;
}

#rank{
    margin: 0;
    font-size: 30px;
    margin: auto;
}
i{
    color: #66ffcc;
    margin: auto;
}


.fade-enter-active,
.fade-leave-active{
    transition: opacity 0.1s;
}


.fade-enter,
.fade-leave-to{
    opacity: 0;
}

h1{
    position: absolute;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
}

#sidebar{
    background-color: #0E0E0E;
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 0 5px -5px rgba(113, 116, 133, 0.5);
}

#sidebar-links-wrapper{
    margin: auto 0;
}

#logout-link{
    color: #ff605c;
    margin-top: 4em;
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

