<script>
const axios = require('axios')

export default {
    name: 'Events',
    data(){
        return{
            events: [],
            empty: false,
        }
    },
    async created(){
        const data = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        await axios.post('http://localhost:3000/api/events_data', {}, data).then((result) => {
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
                <p>{{i.title}}</p>
                <p>{{i.description}}</p>
                <p>{{i.date}}</p>
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
    height: 100%;
    border-radius: 5px;
}

#card-wrapper{
    display: flex;
    overflow: auto;
}

.card{
    height: 30px;
    background: black;
    color: white;
    height: 20em;
    width: 15em;
    padding: 1em !important;
    border-radius: 5px;
    margin: 0.5em;
    overflow: hidden;
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

</style>