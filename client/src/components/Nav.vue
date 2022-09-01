<script>
import {collapsed, toggleSidebar, sidebarWidth} from './state'
import SidebarLink from './SidebarLink.vue'

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
    }
  },
  methods: {
    logout(){
        localStorage.clear()
        window.location.href = '/login'
    }
  }
}
</script>

<template>

            
    <div id="sidebar" :style="{width: sidebarWidth}">
        <h1>
            <transition name="fade">
                <span v-if="!collapsed">
                    <span><img src="https://i.ibb.co/tb3QCbL/avatar-removebg-preview.png" alt="" width="200"></span>
                </span>
            </transition>
        </h1>
        <div id="sidebar-links-wrapper">
            <SidebarLink to="/dashboard" icon="bx bxs-dashboard bx-md">Dashboard</SidebarLink>
            <SidebarLink to="/profile/{{user_id}}" icon="bx bx-user bx-md">User</SidebarLink>
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
    /* margin: auto; */
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
    margin: auto;
}

#logout-link{
    color: #ff605c;
    margin-top: 10em;
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

