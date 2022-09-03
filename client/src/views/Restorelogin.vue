<script>
const axios = require('axios')

export default{
  name: 'Restorelogin',
  data(){
    return{
     email: '',
     secret_key: '',
     error_message: '',
     success_message: '',
     check_message: '',
    }
  },
  methods: {
    async send(){
      this.check_message = 'checking credentials...'
      const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      }

      if(this.email === '' || this.secret_key === '') return this.error_message = 'Please fill all fields'
      if(!validateEmail(this.email)) return this.error_message = 'Enter a valid email'

      const data = {
        email: this.email,
        secret_key: this.secret_key
      }

      await axios.post('http://localhost:3000/api/recover-account', data).then((res) => {
        this.check_message = ''
        this.success_message = res.data.success_message
        setTimeout(() => {
          window.location.href = '/login'
        }, 5000)
      }).catch((err) => {
        this.check_message = ''
        return this.error_message = 'invalid credentials'
      })
    }
  }
}
</script>

<template>
    <div style="height: 100vh; background-color: #03030F !important;">
      <header>
        <a href="/"><img src="https://i.ibb.co/L5qBmym/avatar-removebg-preview.png" alt=""></a>
      </header>
        
      <div id="restore-wrapper">
        
        <div id="restore-form">
          <h1>Recover your account</h1>
          <input class="form-text" type="email" v-model="email" placeholder="Email">
          <input class="form-text" type="password" v-model="secret_key" placeholder="Secret key">

          <button @click="send()">Send</button>
          <p>Please paste the secret key <br> provided to you at registration</p>
          <p>Do not have the key anymore? <br>Contact the<a href="/login" class="links"> Support</a></p>
          <p>Go back to<a href="/login" class="links"> Login</a></p>
          <p style="color: #ff605c;">{{error_message}}</p>
          <p style="color: #00ca4e;">{{success_message}}</p>
        </div>

        <div id="restore-image"></div>

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

#restore-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  text-align: center;
}

#restore-form{
  position: relative;
  margin: auto;
  text-align: center;
  width: 25em;
}

#restore-image{
  background-image: url('../../public/restore-bg.jpg');
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