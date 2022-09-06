<script>
const axios = require('axios')

export default {
    name: 'PubBanners',
    props: [],
    data(){
        return{
            // background_1: 'https://i.ibb.co/CBF2G6r/test.png',
            // background_2: 'https://i.ibb.co/NKfV00x/test.jpg',
            background_1: '',
            background_2: '',
        }
    },
    methods: {

    },
    created(){
        
    }
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
