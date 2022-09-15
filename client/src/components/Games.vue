<script>
const axios = require('axios')

export default {
    name: 'Games',
    data(){
        return{
            games: [],
            empty: false,
        }
    },
    async created(){
        const auth = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        await axios.post('http://localhost:3000/api/update-games-data', {}, auth).then((result) => {
            if(result.data.length === 0) return this.empty = true
            this.games = result
        }).catch((err) => {
            return this.empty = true
        })
    }
}
</script>

<template>
    <div id="wrapper">
        <p id="title">Games</p>
        <div id="card-wrapper">
            <div v-if="empty" id="empty-text">
                <p >Currently there are no games to show</p>
            </div>
            <div class="card" v-for="item in this.games.data" :key="item">
                <div class="game-image-wrapper" :style="{ '--game-card-bg': `url(${item.image})` }">
                    <p class="title">{{item.title}}</p>
                    <button v-if="item.private">Get Whitelisted</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:root{
    --game-card-bg: '';
}

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

.card-text-wrapper{
    color: #d9d9d9;
}
.game-image-wrapper{
    background-image: var(--game-card-bg);
    height: 20em;
    width: 15em;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 1;
    -webkit-box-shadow: 0 0 50px 20px #242C35 inset;
    -moz-box-shadow: 0 0 50px 20px #242C35 inset;
    box-shadow: 0 0 50px 20px #242C35 inset;
}
.title{
    margin: auto;
    background: #242C35;
    font-weight: bold;
    font-size: 0.9em;
}

button{
    margin-top: 100%;
    background: #9efd38;
    padding: 0.5em;
    border-radius: 5px;
    font-weight: bold;
    font-size: 0.9em;
}

button:hover{
    color: #ffffff;
}
</style>