<script>
import Footer from '@/components/Footer.vue'
import {default as country_list} from './country_list.json'

export default{
  name: 'Login_page',
  components: {
    Footer,
  },
  data(){
    return{
      email: null,
      password: null,
      day: null,
      month: null,
      year: null,
      country: null,
      countries: country_list,
      secureCode: null,
      viewMethod: null,
    }
  },
}
</script>

<template>
    <div style="height: 100vh; background-color: #03030F !important;">

      <header>
        <a href="/"><img src="https://i.ibb.co/L5qBmym/avatar-removebg-preview.png" alt=""></a>
      </header>

      <div id="login-wrapper">
        
        <div id="login-form">
          <h3>Log in</h3>
          <input type="text" v-model="email">
          <input type="text" v-model="password">
        </div>

        <div id="login-image"></div>

      </div>
    </div>
</template>

<style scoped>

header{
  width: 100%;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  padding: 0.5em 10em;
}
img{
  width: 200px;
}
Footer{
  position: absolute;
  bottom: 0;
}

#login-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

#login-form{
  position: relative;
  margin: auto;
}

#login-image{
  background-image: url('../../public/login-img.jpg');
  -webkit-box-shadow: 0 0 50px 50px #060304 inset;
  -moz-box-shadow: 0 0 50px 50px #060304 inset;
  box-shadow: 0 0 50px 50px #060304 inset;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>