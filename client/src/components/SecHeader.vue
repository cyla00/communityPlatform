<script>
const axios = require('axios')

export default {
    name: 'SecHeader',
    props: [],
    data(){
        return{
            text: [
                'BY GAMERS FOR GAMERS',
                'We welcome you in our gaming community platform.',
                'Feel free to check out our games, servers and features.',
                'Join us on Discord & Guilded!',
                'Follow us on social media!',
                ],
            get: 'BY GAMERS FOR GAMERS',
            index: 0,
        }   
    },
    created(){
        setInterval(() => {
            if(this.index === this.text.length - 0){
                this.index = 0
            }
            this.get = this.text[this.index++]
        }, 5000)
    }
}
</script>

<template>
    <div id="wrapper">
        <div id="head-wrapper">
            <i class='bx bx-error-alt bx-sm'></i><p>{{get}}</p><i class='bx bx-error-alt bx-sm'></i>
        </div>
    </div>
</template>

<style scoped>
#wrapper{
    background: rgba(49, 62, 70, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12.6px);
    -webkit-backdrop-filter: blur(12.6px);
    height: 3em;
}
#head-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}
p{
    margin-block: auto;
    color: #6EDCD9;
    font-size: 1.5em;
    font-weight: bold;
}
i{
    margin-block: auto;
    margin-inline: 0.5em;
    color: #9254C8;
}
</style>
