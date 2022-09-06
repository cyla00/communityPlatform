<script>
const axios = require('axios')

export default {
    name: 'SecHeader',
    props: [],
    data(){
        return{

        }
    }
}
</script>

<template>
    <div id="wrapper">

    </div>
</template>

<style scoped>
#wrapper{
    background: rgba(49, 62, 70, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12.6px);
    -webkit-backdrop-filter: blur(12.6px);
    height: 3em;
    border-radius: 5px;
}

</style>
