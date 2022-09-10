<script>
const axios = require('axios')

export default {
    name: 'GenHeader',
    props: [],
    data(){
        return{

        }
    }
}
</script>

<template>
    <div id="wrapper">
        <div id="head-wrapper">
            <a href="/dashboard">Dashboard</a>
        </div>
    </div>
</template>

<style scoped>

#wrapper{
    background: rgba(49, 62, 70, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12.6px);
    -webkit-backdrop-filter: blur(12.6px);
    height: 4em;
    width: 100%;
} 
#head-wrapper{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-content: center;
}
a{
  display: flex;
  width: 6em;
  margin: auto;
  justify-content: center;
  padding: 0.7em;
  border: solid 1px #ffffff;
  border-radius: 20px;
  text-decoration: none;
  color: #ffffff;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(to bottom left, #4D2E86, #0B4ECC);
}

a:hover{
  background: linear-gradient(to bottom left, #C9AE66, #FBF3A1);
  color: #000000;
  transition: 0.1s;
  box-shadow: 0px 0px 10px 0px #F1DFF1;
}
</style>