<script>
const axios = require('axios')

export default {
    name: 'TopRanking',
    props: [],
    data(){
        return{
            referral_link: 'http://hardergamers.com/register/idofplayer/awdadawdadadadawdawdawdawdawdadadadadwad',
            balance: 0,
            balance_hidden: false,
        }
    },
    methods: {
        hideBalance(){
            this.balance_hidden = !this.balance_hidden
        }
    }
}
</script>

<template>
    <div id="wrapper">

        <div class="system-wrapper">
            <div class="text-wrapper">
                <p>Your referral link</p>
                <p class="link-text">{{referral_link}}</p>
            </div>
        </div>

        <div class="system-wrapper">
            <div class="text-wrapper">
                <p>Your current balance</p>
                <div id="balance">
                    <p class="link-text" id="balance-number"><span id="token">Token:</span> <span :class="{'hidden': balance_hidden}">{{balance}}</span></p>
                    <button @click="hideBalance"><i class='bx bx-hide bx-md'></i></button>
                </div>
            </div>
        </div>

        <div class="system-wrapper">
            
        </div>

        

    </div>
</template>

<style scoped>
#wrapper{
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 0.5em;
    height: 100%;
}

.system-wrapper{
    background: rgba(49, 62, 70, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12.6px);
    -webkit-backdrop-filter: blur(12.6px);
    height: 100%;
    width: 100%;
    border-radius: 5px;
}

.text-wrapper{
    margin: auto;
    padding: 0.7em;
    width: 50%;
    overflow: hidden;
    font-weight: bold;
}
p{
    color: #F40552;
    margin: auto;
}
.link-text{
    color: #d9d9d9;
    padding: 0.2em;
    background: rgba(49, 62, 70, 0.3);
    border-radius: 5px;
    text-align: center;
    margin: 0;
}
#balance{
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
}
#token{
    color: #82C72C;
}
#balance-number{
    padding: 0.5em;
    width: 100%;
}

.bx-hide{
    color: #d9d9d9;
}
.bx-hide:hover{
    color: #ffffff;
}
.bx-hide:active{
    color:rgba(49, 62, 70, 0.3);
}

.hidden{
    text-shadow: 0 0 10px white;
   color: transparent;
}
</style>