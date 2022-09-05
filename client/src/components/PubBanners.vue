<script>
const axios = require('axios')

export default {
    name: 'PubBanners',
    props: [],
    data(){
        return{

        }
    }
}
</script>

<template>
    <div id="wrapper">
        <div class="blank">

        </div>

        <div class="blank">
            
        </div>
    </div>
</template>

<style scoped>
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
    border-radius: 5px;
}
</style>
