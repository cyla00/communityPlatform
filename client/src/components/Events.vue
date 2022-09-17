<script>
const axios = require('axios')

export default {
    name: 'Events',
    data(){
        return{
            events: [],
            empty: false,
            games: [],
        }
    },
    async created(){
        const data = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        await axios.post('http://localhost:3000/api/update-events-data', {}, data).then((result) => {
            if(result.data.length === 0) return this.empty = true
            return this.events = result
        }).catch((err) => {
            return this.empty = true
        })
    }
}
</script>

<template>
    <div id="wrapper">
        <p id="title">Events</p>

        <div v-if="empty" id="empty-text">
            <p>Currently there are no events to show</p>
        </div>

        <div id="card-wrapper">
            <div class="card" v-for="i in events.data" :key="i">
                <div class="server-wrapper">
                    <p class="p-content p-title">{{i.title}}</p>
                    <p class="p-content p-description">{{i.description}}</p>
                    <img src="https://i.ibb.co/dcLPQXG/award.png" alt="">
                    <p class="p-content p-date">{{i.date}}</p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
#wrapper{
    background: rgba(49, 62, 70, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12.6px);
    -webkit-backdrop-filter: blur(12.6px);
    border-radius: 5px;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#card-wrapper{
    display: flex;
    overflow-x: scroll;
}

.card{
    background: #242C35;
    color: white;
    height: 20em;
    width: 15em;
    border-radius: 5px;
    margin: 0.5em;
    border: none;
    border-radius: 5px;
}

#title{
    color: #F40552;
    font-weight: bold;
    font-size: 0.9em;
}

#empty-text{
    display: flex;
    justify-content: center;
    height: 100%;
    font-size: 20px;
    margin: auto;
}

.server-wrapper{
    background-image: url('https://i.ibb.co/TgJ3V35/party.png');
    height: 20em;
    width: 15em;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 13em;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
}
.p-description{
    font-size: 0.8em;
}
.p-content{
    margin: 0;
}
.p-title{
    color: #00ffcc;
}
.p-date{
    color: #ff00ff;
}
img{
    width: 5em;
    margin: auto;
}
</style>
















