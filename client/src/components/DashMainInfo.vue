<script>
const axios = require('axios')

export default {
    name: 'TopRanking',
    props: [],
    data(){
        return{

        }
    }
}
</script>

<template>
    <div id="wrapper">

        <div class="system-wrapper">
            
        </div>

        <div class="system-wrapper">
            
        </div>

        <div class="system-wrapper">
            
        </div>

        

    </div>
</template>

<style scoped>
#wrapper{
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5em;
    height: 100%;
}

.system-wrapper{
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    background: rgba(49, 62, 70, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12.6px);
    -webkit-backdrop-filter: blur(12.6px);
    height: 100%;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 0.5em;
    margin-top: 0.2em;
}
</style>