<script>
const axios = require('axios')

export default {
    name: 'TopRanking',
    props: ['balance', 'referral_link'],
    data(){
        return{
            balance_hidden: true,
            copied: false,
        }
    },
    methods: {
        hideBalance(){
            this.balance_hidden = !this.balance_hidden
        },
        async copy(){
            await navigator.clipboard.writeText(this.$props.referral_link)
            this.copied = true
            setTimeout(() => {
                this.copied = false
            }, 1000)
        }
    }
}
</script>

<template>
    <div id="wrapper">

        <Teleport to="body">
            <Transition>
            <div id="modal" v-if="copied">
                <p>Link Copied</p>
            </div>
            </Transition>
        </Teleport>

        <div class="system-wrapper">
            <div class="text-wrapper">
                <p class="title">Your referral link</p>
                <button id="link-copy" @click="copy()"><i class='bx bx-copy-alt bx-sm'></i>copy link</button>
            </div>
        </div>

        <div class="system-wrapper">
            <div class="text-wrapper">
                <p class="title">Your current balance</p>
                <div id="balance">
                    <p class="link-text" id="balance-number"><span id="token"><i class='bx bxs-coin-stack'></i></span> <span :class="{'hidden': balance_hidden}">{{balance}}</span></p>
                    <button @click="hideBalance"><i class='bx bx-hide bx-md'></i></button>
                </div>
            </div>
        </div>

        <div class="system-wrapper">
            <div class="text-wrapper">
                <p class="title">Follow us on the net!</p>
                <div id="socials">
                    <a class="social-links" href=""><i class='bx bxl-discord bx-md'></i></a>
                    <a class="social-links" href=""><i class='bx bxl-telegram bx-md'></i></a>
                    <a class="social-links" href=""><i class='bx bxl-youtube bx-md'></i></a>
                    <a class="social-links" href=""><i class='bx bxl-tiktok bx-md'></i></a>
                    <a class="social-links" href=""><i class='bx bxl-instagram-alt bx-md'></i></a>
                    <a class="social-links" href=""><i class='bx bxl-twitter bx-md'></i></a>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.social-links{
    margin-right: 1em;
    color: #d9d9d9;
}
.social-links:hover{
    color: #ff00ff;
}

#modal{
    position: absolute;
    z-index: 3;
    top: 0;
    left: 50%;
    background: #d9d9d9;
    color: #F40552;
    color: black;
    font-family: Poppins;
    font-weight: bold;
    padding: 0.5em;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

#link-copy{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    background: rgba(49, 62, 70, 0.3);
    padding: 0.5em;
    border-radius: 5px;
    color: #d9d9d9;
    text-transform: capitalize;
    font-family: Poppins;
}
#link-copy:hover{
    background-color: rgba(36, 81, 100, 0.5);
}
#link-copy:active{
    background-color: rgba(38, 193, 202, 0.5)
}
.bx-copy-alt{
    margin-right: 0.5em;
    color: #26c1ca;
}

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
    padding: 0.5em;
    background: rgba(49, 62, 70, 0.3);
    border-radius: 5px;
    text-align: center;
    margin: 0;
    height: 20px;
    overflow: hidden !important;
}
.title{
    font-size: 0.9em;
}
#balance{
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
}
#token{
    color: #889b73;
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