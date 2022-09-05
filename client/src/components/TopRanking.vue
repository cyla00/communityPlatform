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
            <div class="section-wrapper" id="rank-1">
                
            </div>  

            <div class="section-wrapper middle-card" id="rank-2">

            </div>

            <div class="section-wrapper" id="rank-3">

            </div>
        </div>

        <div class="system-wrapper">
            <div class="section-wrapper" id="rank-player-1">

            </div>

            <div class="section-wrapper middle-card" id="rank-player-2">

            </div>

            <div class="section-wrapper" id="rank-player-3">

            </div>
        </div>

        

    </div>
</template>

<style scoped>
#wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr;
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

.section-wrapper{
    background: grey;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    margin: 0.2em;
    opacity: 0.4;
}


#rank-1{
    background-image: url('../../public/texture.png');
    background-color: #FFD700;
}
#rank-2{
    background-image: url('../../public/texture.png');
    background-color: #C0C0C0;
}
#rank-3{
    background-image: url('../../public/texture.png');
    background-color: #CD7F32;
}
#rank-player-1{
    background-image: url('../../public/texture.png');
    background-color: #FFD700;
}
#rank-player-2{
    background-image: url('../../public/texture.png');
    background-color: #C0C0C0;
}
#rank-player-3{
    background-image: url('../../public/texture.png');
    background-color: #CD7F32;
}

</style>