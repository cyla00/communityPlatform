<script>
import Footer from '@/components/Footer.vue'
import {default as country_list} from './country_list.json'
const axios = require('axios').default

export default{
  name: 'Login_page',
  components: {
    Footer,
  },
  data(){
    return{
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      birth_date: '',
      country: '',
      countries: country_list,
      secureCode: '',
      viewMethod: '',
      accept_check: false,
      form_correct: false,
      error_message: '',
    }
  },
  methods:{
    checkFields(){
      const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      }

      if(this.username === '' || this.email === '' || this.password === '' || this.confirm_password === '' || this.birth_date === '' || this.country === '' || this.viewMethod === ''){
        return this.error_message = 'Please fill all required fields'
      }
      if(!validateEmail(this.email)) return this.error_message = 'Email not valid'
      if(this.password !== this.confirm_password) return this.error_message = 'Passwords do not match'

      const passwordCheck = (passwordStrenght) => {
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        return strongPassword.test(passwordStrenght)
      }

      if(!passwordCheck(this.password)) return this.error_message = 'Use a secure password! (ex: AaZz19@#$)'
      if(!this.accept_check) return this.error_message = 'Please accept our terms and conditions'

      const body = {
        username: this.username,
        email: this.email,
        password: this.password,
        birth_date: this.birth_date,
        country: this.country,
        how_found_us: this.viewMethod,
      }

      axios.post('http://localhost:3000/api/registration', body).then((res) => {
        if(res.status === 201) {
          this.secureCode = res.data.security_key
          this.form_correct = true
        }
      }).catch((err) => {
        return this.error_message = err.response.data.error
      })
    },

  },
}
</script>

<template>
    <div style="height: 100vh; background-color: #03030F !important;">

      <header>
        <a href="/"><img src="https://i.ibb.co/L5qBmym/avatar-removebg-preview.png" alt=""></a>
      </header>

      <div id="registration-wrapper">
      
        <div id="registration-form">
          <h1>Registration</h1>
          <input class="form-text" type="text" v-model="username" placeholder="Username *" spellcheck=”false”>
          <input class="form-text" type="email" v-model="email" placeholder="Email *" spellcheck=”false”>
          <input class="form-text" type="password" v-model="password" placeholder="Password *" spellcheck=”false”>
          <input class="form-text" type="password" v-model="confirm_password" placeholder="Repeat password *" spellcheck=”false”>

          <div id="birth-date-wrapper">
            <label for="birth">Birth date *</label>
            <input id="birth" class="form-birth" type="date" v-model="birth_date" placeholder="dd" spellcheck=”false”>
          </div>
          
          <div id="country-wrapper">
            <select v-model="country" id="country-selector">
              <option disabled value="">Please select your country *</option>
              <option v-for="i in countries" v-bind:key="i" :value="i.name">{{i.name}}</option>
            </select>
          </div>
          

          <select v-model="viewMethod" id="how-find-wrapper">
            <option disabled value="">How did you find us? *</option>
            <option>Twitch</option>
            <option>YouTube</option>
            <option>Social Media</option>
            <option>Gaming communities</option>
            <option>Other</option>
          </select>

          <div id="accept-check">
            <input type="checkbox" v-model="accept_check">
            <p>I accept the terms of sale and privacy policy *</p>
          </div>
          
          <button @click="checkFields()">Ready to start!</button>
          <p>Already have an account?<a href="/login" id="login-goto"> Login</a></p>
          <p style="color: red;">{{error_message}}</p>
          
          
            <Teleport to="body">
              <Transition>
              <div id="modal-back" v-if="form_correct">
                <div class="modal">
                  <h1>welcome in the platform!</h1>
                  <p>Save your key somewhere! <br> you will need it to recover your profile.</p>
                  <p id="sek-title">This is your secret key:</p>
                  <p id="secure_code">{{secureCode}}</p>
                  <i class='bx bx-envelope bx-md'></i>
                  <p>Check your inbox for the email verification.</p>
                  <p>after that, <a href="/login">Login!</a></p>
                </div>
              </div>
              </Transition>
            </Teleport>
          
        </div>

        <div id="registration-image"></div>
      </div>
    </div>
</template>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 1.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#modal-back{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
}

.modal{
  position: absolute;
  text-align: center;
  font-family: Poppins;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to bottom left, #4D2E86, #0B4ECC);
  color: #ffffff;
  padding: 2em;
  padding-left: 6em;
  padding-right: 6em;
  -webkit-box-shadow: 0 0 50px 5px #ffffff;
  -moz-box-shadow: 0 0 50px 5px #ffffff;
  box-shadow: 0 0 15px 1px #ffffff;
}
.modal h1{
  border-bottom: solid 1px;
  margin: 0;
  text-transform: uppercase;
  color: #ff00ff;
}
.modal p{
  margin: 0.5em;
}
.modal a{
  color: #00ca4e;
  text-transform: uppercase;
  font-weight: bold;
}

#secure_code{
  background: #bfbfbf;
  padding: 0.8em;
  border-radius: 10px;
  font-weight: bold;
  color: #060304;
}

.bx-envelope{
  border-top: solid 1px;
  width: 100%;
  padding-top: 0.5em;
}

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

#registration-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

#registration-form{
  position: relative;
  margin: auto;
}

#registration-image{
  background-image: url('../../public/register-img.png');
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

.form-birth{
  padding: 0.5em;
  font-size: 1.1em;
  background: #4d4d4d;
  border: solid 2px #C9AE66;
  border-radius: 20px;
  color: #ffffff;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 1em;
}

::placeholder {
  color: #C9AE66;
  opacity: 1;
}

#accept-check{
  display: flex;
}

#country-selector{
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 100%;
  padding: 0.5em;
  font-size: 1.1em;
  background: #4d4d4d;
  border: solid 2px #C9AE66;
  border-radius: 20px;
  color: #ffffff;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 1em;
}

button{
  justify-content: center;
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
#login-goto{
  color: #C9AE66;
}

#how-find-wrapper{
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 100%;
  padding: 0.5em;
  font-size: 1.1em;
  background: #4d4d4d;
  border: solid 2px #C9AE66;
  border-radius: 20px;
  color: #ffffff;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 1em;
}

.error-mgs{
  color: red;
}
</style>