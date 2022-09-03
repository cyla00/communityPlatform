<script>
import Footer from '@/components/Footer.vue'
const axios = require('axios')
import jwt_decode from "jwt-decode"


export default{
  name: 'Login_page',
  components: {
    Footer,
  },
  data(){
    return{
      email: '',
      password: '',
      error_message: '',
    }
  },
  methods: {
    async login(){
      const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      }

      if(this.email === '' || this.password === '') return this.error_message = 'Please fill all fields'
      if(!validateEmail(this.email)) return this.error_message = 'Enter a valid email'

      const basicAuth = {
        auth: {
          username: this.email,
          password: this.password,
        }
      }
      await axios.post('http://localhost:3000/api/login', {}, basicAuth).then((res) => {
        localStorage.setItem('token', res.data.access_token)
        const decoded_token = jwt_decode(localStorage.getItem('token'))
        localStorage.setItem('id', decoded_token.id)
        localStorage.setItem('last_login', decoded_token.last_login)

        return window.location.href = '/dashboard'
      }).catch((err) => {
        return this.error_message = err.response.data.error
      })
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
          <h1>Log in</h1>
          <input class="form-text" type="email" v-model="email" placeholder="Email">
          <input class="form-text" type="password" v-model="password" placeholder="Password">

          <button @click="login()">Login</button>
          <p>I forgot my<a href="/recoverlogin" class="links"> password</a></p>
          <p>Don't have an account?<a href="/registration" class="links"> Register</a></p>
          <p style="color: #ff605c;">{{error_message}}</p>
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
  text-align: center;
}

#login-form{
  position: relative;
  margin: auto;
  text-align: center;
  width: 25em;
}

#login-image{
  background-image: url('../../public/login-img.jpg');
  -webkit-box-shadow: 0 0 50px 50px #060304 inset;
  -moz-box-shadow: 0 0 50px 50px #060304 inset;
  box-shadow: 0 0 50px 50px #060304 inset;
  background-size: cover;
  background-repeat: no-repeat;
}

.form-text{
  width: 100%;
  font-size: 1.1em;
  background: #4d4d4d;
  border: solid 1px #C9AE66;
  color: #ffffff;
  border-radius: 20px;
  padding: 0.8em;
  outline:none;
  font-family: Poppins;
  display: flex;
  margin: auto;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

button{
  width: 8em;
  justify-content: center;
  margin-top: 1em;
  padding: 0.7em;
  border: solid 1px #ffffff;
  border-radius: 20px;
  text-decoration: none;
  color: #03030F;
  font-size: 1rem;
  font-weight: bold;
  background: linear-gradient(to bottom left, #C9AE66, #FBF3A1);
}
button:hover{
  background: linear-gradient(to bottom left, #4D2E86, #0B4ECC);
  transition: 0.1s;
  box-shadow: 0px 0px 10px 0px #F1DFF1;
  color: #ffffff;
}

::placeholder {
  color: #C9AE66;
  opacity: 1;
}

.links{
  color: #C9AE66;
}
</style>