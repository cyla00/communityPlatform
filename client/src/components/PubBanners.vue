<script>
const { io } = require("socket.io-client")
const axios = require('axios')

export default {
    name: 'PubBanners',
    data(){
        return{
            item1: '',
            item2: '',
            background_1: '"https://i.ibb.co/p4BsNpt/awdawd-1.png',
            background_2: '"https://i.ibb.co/p4BsNpt/awdawd-1.png',
            array: [],
            timer: null,
        }
    },
    methods: {

  },
  async created(){
    const data = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        await axios.post('http://localhost:3000/api/advertisements-data', {}, data).then((result) => {
            if(result.data.length === 0) return
            this.array.splice(0, this.array.length, ...result.data)
        }).catch((err) => {
            return
        })
        setInterval(() => {
            this.item1 = this.array[Math.floor(Math.random() * this.array.length)]
            this.item2 = this.array[Math.floor(Math.random() * this.array.length)]
            this.background_1 = this.item1.image
            this.background_2 = this.item2.image
        }, 6000)
    },
}
</script>

<template>
    <div id="wrapper">
        <div class="blank">
            <div :style="{ '--bgImage1': `url(${background_1})` }" class="image-wrapper" id="bg-1"> 
                <div class="text-wrapper">
                    <p>Promote your community or channel here!</p>
                    <p>5:1 ratio</p>
                </div>
            </div>
        </div>

        <div class="blank">
            <div :style="{ '--bgImage2': `url(${background_2})` }" class="image-wrapper" id="bg-2">
                <div class="text-wrapper">
                    <p>Promote your community or channel here!</p>
                    <p>5:1 ratio</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:root{
    --bgImage1: '';
    --bgImage2: '';
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5em;
}

.blank{
    background: rgba(49, 62, 70, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12.6px);
    -webkit-backdrop-filter: blur(12.6px);
    height: 150px;
    width: 750px;
    border-radius: 5px;
    margin: auto;
    margin-top: 0.5em;
}
.text-wrapper{
    position: relative;
    z-index: -1;
    padding: 5%;
}
p{
    margin: auto;
    opacity: 0.5;
}
.image-wrapper{
    width: 100%;
    height: 100%;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-position: center;
    border-radius: 5px;
    overflow: hidden;
}
#bg-1{
    background: var(--bgImage1)
}

#bg-2{
    background: var(--bgImage2)
}
</style>
