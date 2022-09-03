<script>
import Footer from '@/components/Footer.vue'
const axios = require('axios')

export default{
  name: 'Login_page',
  components: {
    Footer,
  },
  data(){
    return{
      password: '',
      confirm_password: '',
      error_message: '',
      success_message: '',
      checking_message: '',
      success: false,
      key: '',
    }
  },
  methods: {
    async recovery(){
        
        this.checking_message = 'checking credentials...'

        if(this.password === '' || this.confirm_password === '') return this.error_message = 'Please fill all fields'
        const passwordCheck = (passwordStrenght) => {
            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            return strongPassword.test(passwordStrenght)
        }
        if(!passwordCheck(this.password)) return this.error_message = 'Use a stronger password! (ex: AaZz19@#$)'
        if(this.password !== this.confirm_password) return this.error_message = 'Password do not match'
        
        const data = {
            id: this.$route.params.id,
            key: this.$route.params.key,
            new_pass: this.password
        }

        axios.post('http://localhost:3000/api/set-pass', data).then((res) => {
            this.key = res.data.key
            this.checking_message = ''
            this.success_message = res.data.success
            return this.success = true
        }).catch((err) => {
            console.log(err);
            this.checking_message = ''
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

      <div id="recovery-wrapper">
        
        <div id="recovery-form">
          <h1>Reset password</h1>
          <input class="form-text" type="password" v-model="password" placeholder="New password">
          <input class="form-text" type="password" v-model="confirm_password" placeholder="Confirm password">

          <button @click="recovery()">Reset</button>
          <p>Back to<a href="/login" class="links"> login</a></p>
          <p>Contact us for further<a href="/contact-us" class="links"> support</a></p>
          <p style="color: #ff605c;">{{error_message}}</p>
          <p style="color: #00ca4e;">{{success_message}}</p>
        </div>

        <div id="recovery-image"></div>

        <Teleport to="body">
              <Transition>
              <div id="modal-back" v-if="success">
                    <div class="modal">
                        <i class='bx bxs-error bx-md'></i>
                        <h1>New key generated</h1>
                        <p>Save your key somewhere safe! <br> you will need it to recover your profile.</p>
                        <p id="sek-title">This is your new secret key:</p>
                        <p id="secure_code">{{key}}</p>
                        <p>now you can <a href="/login">Login!</a></p>
                    </div>
                </div>
            </Transition>
        </Teleport>

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

#modal-back{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
}
i{
    color: #ffbd44;
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

#recovery-wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  text-align: center;
}

#recovery-form{
  position: relative;
  margin: auto;
  text-align: center;
  width: 25em;
}

#recovery-image{
  background-image: url('../../public/renew-bg.jpg');
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