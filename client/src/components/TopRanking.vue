<script>
const axios = require('axios')

export default {
    name: 'TopRanking',
    props: [],
    data(){
        return{
            first_player: 'player1',
            second_player: 'player2',
            third_player: 'player2',
            first_community: 'community1',
            second_community: 'community2',
            third_community: 'community2',
            rank_player_1: '2000',
            rank_player_2: '1000',
            rank_player_3: '500',
            rank_community_1: '2000',
            rank_community_2: '1000',
            rank_community_3: '500',
        }   
    }
}
</script>

<template>
    <div id="wrapper">
        <div class="system-wrapper">
            <p class="title">Community ranking</p>
            <div class="section-wrapper" id="rank-1">
                <img class="place-img" src="https://i.ibb.co/JFYJNMY/first.png" alt="">
                <p class="player-name">
                    <span class="span-1"><i class='bx bxs-star bx-sm'></i>{{rank_community_1}}</span>
                    {{first_community}}
                </p>
            </div>  

            <div class="section-wrapper middle-card" id="rank-2">
                <img class="place-img" src="https://i.ibb.co/jwjYmBQ/second.png" alt="">
                <p class="player-name">
                    <span class="span-2"><i class='bx bxs-star bx-sm'></i>{{rank_community_2}}</span>
                    {{second_community}}
                </p>
            </div>

            <div class="section-wrapper" id="rank-3">
                <img class="place-img" src="https://i.ibb.co/NsXYk8x/third.png" alt="">
                <p class="player-name">
                    <span class="span-3"><i class='bx bxs-star bx-sm'></i>{{rank_community_3}}</span>
                    {{third_community}}
                </p>
            </div>
        </div>

        <div class="system-wrapper">
            <p class="title">Players ranking</p>
            <div class="section-wrapper" id="rank-player-1">
                <img class="place-img" src="https://i.ibb.co/JFYJNMY/first.png" alt="">
                <p class="player-name">
                    <span class="span-1"><i class='bx bxs-star bx-sm'></i>{{rank_player_1}}</span>
                    {{first_player}}
                </p>
            </div>

            <div class="section-wrapper middle-card" id="rank-player-2">
                <img class="place-img" src="https://i.ibb.co/jwjYmBQ/second.png" alt="">
                <p class="player-name">
                    <span class="span-2"><i class='bx bxs-star bx-sm'></i>{{rank_player_2}}</span>
                    {{second_player}}
                </p>
            </div>

            <div class="section-wrapper" id="rank-player-3">
                <img class="place-img" src="https://i.ibb.co/NsXYk8x/third.png" alt="">
                <p class="player-name">
                    <span class="span-3"><i class='bx bxs-star bx-sm'></i>{{rank_player_3}}</span>
                    {{third_player}}
                </p>
            </div>
        </div>

        

    </div>
</template>

<style scoped>
#wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5em;
    height: 30vh;
}

.title{
    margin: auto;
    font-size: 0.9em;
    font-weight: bold;
    color: #F40552;
}

.system-wrapper{
    display: grid;
    grid-template-rows: 10% 1fr 1fr 1fr;
    background: rgba(49, 62, 70, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12.6px);
    -webkit-backdrop-filter: blur(12.6px);
    height: 100%;
    width: 100%;
    border-radius: 5px;
}

.section-wrapper{
    background: grey;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    margin: 0.2em;
    display: grid;
    grid-template-columns: 20% 80%;
    overflow: hidden;
}

.place-img{
    width: 4em;
    margin: auto;
    display: flex;
    justify-content: start;
}
.player-name{
    color: #ffffff;
    font-size: 1.5em;
    font-weight: bold;
}
.bxs-star{
    color: #66ffcc !important;
    margin: auto;
}
.span-1{
    color: #EA3788 !important;
}
.span-2{
    color: #F391A0 !important;
}
.span-3{
    color: #E56B70 !important;
}


#rank-1{
    background-image: url('../../public/texture.png');
    background-color: rgba(255, 215, 0, 0.2);
}
#rank-2{
    background-image: url('../../public/texture.png');
    background-color: rgba(192, 192, 192, 0.2);
}
#rank-3{
    background-image: url('../../public/texture.png');
    background-color: rgba(205, 127, 50, 0.2);
}
#rank-player-1{
    background-image: url('../../public/texture.png');
    background-color: rgba(255, 215, 0, 0.2);
}
#rank-player-2{
    background-image: url('../../public/texture.png');
    background-color: rgba(192, 192, 192, 0.2);
}
#rank-player-3{
    background-image: url('../../public/texture.png');
    background-color: rgba(205, 127, 50, 0.2);
}

</style>