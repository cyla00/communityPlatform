<script>
const axios = require('axios')

export default {
    name: 'Servers',
    data(){
        return{
            servers: [],
            empty: false,
        }
    },
    async created(){
        const data = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        await axios.post('http://localhost:3000/api/update-servers-data', {}, data).then((result) => {
            if(result.data.length === 0) return this.empty = true
            return this.servers = result
        }).catch((err) => {
            return this.empty = true
        })
    }
}
</script>

<template>
    <div id="wrapper">
        <p id="title">Our Servers</p>

        <div v-if="empty" id="empty-text">
            <p>Currently there are no servers to show</p>
        </div>

        <div id="card-wrapper">
            <div class="card" v-for="i in servers.data" :key="i">
                <div class="server-wrapper">
                    <div class="dot"></div>
                    <p class="p-content p-title">{{i.title}}</p>
                    <p class="p-content"><span class="p-host">{{i.host}}</span> : <span class="p-port">{{i.port}}</span></p>
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
    background-image: url('https://i.ibb.co/93CzbnC/server-1.png');
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

.p-content{
    margin: 0;
}
.p-title{
    color: #00ffcc;
}
.p-host{
    color: #ff00ff;
}
.p-port{
    color: #ff66ff;
    padding: 0;
}

.dot{
    height: 1em;
    width: 1em;
    border-radius: 100%;
    background-color: #00ca4e;
    margin: 1em;
    margin-inline: auto;
}
</style>