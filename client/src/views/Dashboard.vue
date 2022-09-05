<script>
import Nav from '@/components/Nav.vue'
import PubBanners from '@/components/PubBanners.vue'
import SecHeader from '@/components/SecHeader.vue'
import DashMainInfo from '@/components/DashMainInfo.vue'
import TopRanking from '@/components/TopRanking.vue'

import {sidebarWidth} from '../components/state'
const axios = require('axios')
const { io } = require("socket.io-client")

export default{
  name: 'Logged',
  data(){
    return{
      sidebarWidth,
      username: 'wdwd',
      rank: undefined,
    }
  },
  components: {
    Nav,
    PubBanners,
    SecHeader,
    DashMainInfo,
    TopRanking,
  },
  methods: {
    async getUserData(){

        const data = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        await axios.post('http://localhost:3000/api/update-user-data', {}, data).catch((err) => {
            console.log(err)
            return
      })
    },
  },
  async created(){
        const socket = io('http://localhost:3000', {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    },
                },
            })
            
        // await socket.on('connect', async () => {

        // })

        // await socket.on('disconnect', () => {

        // })

        await socket.on('data', async (data) => {
            await this.getUserData()
            let array = []

            await data.forEach(element => {
                array.push(element)
            })

            let context_user = array.find(element => element.id === localStorage.getItem('id'))
            this.username = context_user.username
            this.rank = context_user.user_rank
        })
  }
}
</script>

<template>
    <div id="main">
        <Nav :username='username' :rank='rank' />
        <div :style="{'margin-left': sidebarWidth}" id="wrapper">
          <SecHeader/>
          <PubBanners/>

          <div id="middle-wrapper">
            <DashMainInfo/>
            <TopRanking/>
          </div>

          <div id="bottom-wrapper">

          </div>

        </div>
    </div>
</template>

<style scoped>
#main{
  height: 100vh;
  width: 100vw;
  background: #161923;
}

#wrapper{
  padding: 0.25em;
  padding-left: 0.8em;
}

#middle-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 400px;
}

</style>