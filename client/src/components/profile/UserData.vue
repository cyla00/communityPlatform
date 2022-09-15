<script>
const { io } = require("socket.io-client")
const axios = require('axios')

const socket = io('ws://localhost:3000', {
    reconnectionDelayMax: 10000,
    transports: ["websocket"],
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
    cors: {
        origin: "ws://localhost:3000",
    },
})

const auth = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default{
  name: 'UserData',
  data(){
    return{
        username: '',
        email: '',
        old_password: '',
        new_password: '',
        address: '',
        city: '',
        zip_code: '',
        country: '',
        steam: '',
        discord: '',
        twitch: '',
        youtube: '',
        users: [],
        error_message: '',
        success_message: '',
        success: false,
        correctForm: true,
        reloaded: false,
        verify: false,
    }
  },
  components: {

  },
  methods: {
    reloadPage(){
        if (localStorage.getItem('reloaded')) {
            localStorage.removeItem('reloaded')
        } else {
            localStorage.setItem('reloaded', '1')
            location.reload()
        }
    },
    resetErrorMessage(){
      if(this.correctForm === false){
        setTimeout(() => {
            this.correctForm = true
        }, 4000)
      }
    },
    resetSuccessMessage(){
      if(this.success){
        setTimeout(() => {
            this.success = false
        }, 4000)
      }
    },
    async saveChanges(){
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        }

        if(!validateEmail(this.email)){
            this.error_message = 'Enter a valid email'
            this.correctForm = false
            return this.resetErrorMessage()
        }

        if(this.username === '' || this.email === ''){
            this.error_message = 'Fill username and email'
            this.correctForm = false
            return this.resetErrorMessage()
        }

        const data = {
            id: localStorage.getItem('id'),
            email: this.email,
            address: this.address,
            city: this.city,
            zip_code: this.zip_code,
            country: this.country,
            steam_link: this.steam,
            discord_user: this.discord,
            twitch_channel: this.twitch,
            youtube_channel: this.youtube,
        }

        await axios.post('http://localhost:3000/api/update-credentials', data, auth).then((res) => {
            if(res.status === 200){
                this.success_message = 'Credentials successfully changed'
                this.success = true
                return this.resetSuccessMessage()
            }
        }).catch((err) => {
            console.log(err)
            this.error_message = err.response.data.error_message
            this.correctForm = false
            return this.resetErrorMessage()
      })
    },
    async getUserData(){

        const data = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        await axios.post('http://localhost:3000/api/update-user-data', {}, data).catch((err) => {
            return
      })
    },
    async deleteAccount(){
        this.verify = true
    },
    async acceptDelete(){
        const data = {
            id: localStorage.getItem('id')
        }
        await axios.post('http://localhost:3000/api/delete-account', data, auth).then(() => {
            localStorage.clear()
            window.location.href = '/login'
        }).catch((err) => {
            this.error_message = err.response.data.error_message
            this.correctForm = false
            return this.resetErrorMessage()
        })
    },
    goBack(){
        this.verify = false
    },
    async changePass(){
        if(this.old_password === '' || this.new_password === ''){
            this.error_message = 'Fill all fields'
            this.correctForm = false
            return this.resetErrorMessage()
        }
        
        const passwordCheck = (passwordStrenght) => {
            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            return strongPassword.test(passwordStrenght)
        }
        if(!passwordCheck(this.new_password)) return this.error_message = 'Use a stronger password! (ex: AaZz19@#$)'

        const data = {
            id: localStorage.getItem('id'),
            old_password: this.old_password,
            new_password: this.new_password,
        }
        await axios.post('http://localhost:3000/api/change-password', data, auth).then((res) => {
            if(res.status === 200){
                this.success_message = 'Password successfully changed'
                this.success = true
                return this.resetSuccessMessage()
            }
        }).catch((err) => {
            this.error_message = 'Password change failed'
            this.correctForm = false
            return this.resetErrorMessage()
        })
    },
  },
  created(){
    this.getUserData() 
    socket.on('user_data', (data) => {
        
        this.users.splice(0, this.users.length, ...data)
            
        let context_user = this.users.find(element => element.id === localStorage.getItem('id'))
        this.username = context_user.username
        this.email = context_user.email
        this.address = context_user.address
        this.city = context_user.city
        this.zip_code = context_user.zip_code
        this.country = context_user.country
        this.steam = context_user.steam_profile_link
        this.discord = context_user.discord_username
        this.twitch = context_user.twitch_link
        this.youtube = context_user.youtube_link
    })
    this.reloadPage()
  }
}
</script>

<template>
    <div id="wrapper">
            <div id="primer-wrapper" class="inner">
                <h3>General</h3>
                <div>
                    <input type="text" v-model="username" class="data-input" placeholder="username" readonly>
                </div>
                
                <div>
                    <input type="text" v-model="email" class="data-input" placeholder="email" readonly>
                </div>

                <div>
                    <h3>Change password</h3>
                    <input type="password" v-model="old_password" class="data-input" placeholder="password">
                    <input type="password" v-model="new_password" class="data-input" placeholder="new password">
                    <button @click="changePass">Change password</button>
                </div>
            </div>
        
            <div id="country" class="inner">
                <h3>Location</h3>
                <div class="country-wrapper">
                    <input type="text" v-model="address" class="data-input" placeholder="address">
                </div>
                
                <div class="country-wrapper">
                    <input type="text" v-model="city" class="data-input" placeholder="city">
                </div>
                
                <div class="country-wrapper">
                    <input type="text" v-model="zip_code" class="data-input" placeholder="Zip code">
                </div>
                
                <div class="country-wrapper">
                    <input type="context_user" v-model="country" class="data-input" readonly>
                </div>
            </div>
            


        

            <div id="links" class="inner">
                <h3>Links</h3>
                <div class="links-wrappers">
                    <i class='bx bxl-steam bx-md'></i><input type="text" v-model="steam" class="data-input" placeholder="steam link">
                </div>
                
                <div class="links-wrappers">
                    <i class='bx bxl-discord bx-md' ></i><input type="text" v-model="discord" class="data-input" placeholder="username#0000">
                </div>
                
                <div class="links-wrappers">
                    <i class='bx bxl-twitch bx-md' ></i><input type="text" v-model="twitch" class="data-input" placeholder="twitch channel">
                </div>
                
                <div class="links-wrappers">
                    <i class='bx bxl-youtube bx-md' ></i><input type="text" v-model="youtube" class="data-input" placeholder="youtube channel">
                </div>
            </div>
            <div></div>
            <div id="button-wrapper">
                <button @click="deleteAccount" id="delete">Delete account</button>
                <button @click="saveChanges" id="save">Save changes</button>
            </div>

        <Teleport to="body">
            <Transition>
            <div class="modal" v-if="!correctForm">
                <p class="img-err-p"><i class='bx bx-error bx-sm'></i>{{error_message}}<i class='bx bx-error bx-sm'></i></p>
            </div>
            </Transition>
        </Teleport>

        <Teleport to="body">
            <Transition>
            <div class="modal success" v-if="success">
                <p class="img-err-p"><i class='bx bx-check bx-sm'></i>{{success_message}}<i class='bx bx-check bx-sm'></i></p>
            </div>
            </Transition>
        </Teleport>

        <Teleport to="body">
            <Transition>
            <div class="modal verify" v-if="verify">
                <p class="img-err-p"><i class='bx bx-error bx-sm'></i>By deleting your account, all your data will be deleted.<br>and you wont be able to recover it.<i class='bx bx-error bx-sm'></i></p>
                <button @click="acceptDelete" id="delete-btn">Delete my account</button>
                <button @click="goBack" id="back-btn">Go back</button>
            </div>
            </Transition>
        </Teleport>

        
        
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal{
    position: absolute;
    z-index: 3;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background: #d9d9d9;
    color: #F40552;
    font-family: Poppins;
    font-weight: bold;
    padding: 0.5em;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: center;
}
.success{
    background: #d9d9d9;
    color: #00ca4e !important;
}

#wrapper{
    margin: auto;
    margin-top: 2em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

#delete{
    background: #ff605c;
}

.inner{
    width: 30em;
    margin-inline: auto;
}

.data-input{
    margin: auto;
    width: 90%;
    padding: 0.5em;
    text-align: center;
    border-radius: 10px;
    outline: none;
    border: solid 2px #50607c;
    font-family: Poppins;
    background: #50607c;
    margin-top: 0.5em;
    color: black;
    font-weight: bold;
}

h3{
    color: #F40552;
    font-weight: bold;
}

::placeholder {
  color: rgba(217, 217, 217, 0.5);
}

button{
  background-color: #00ca4e ;
  color: #d9d9d9;
  padding: 0.5em;
  border-radius: 5px;
  margin: 2em;
  font-weight: bold;
}
button:hover{
  color: #19353B;
}

.links-wrappers{
    display: flex;
}
i{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: 0.2em;
}

.img-err-p{
    display: flex;
}

#delete-btn{
    background: #ff605c;
    color: #50607c;
}
#back-btn{
    background: #ffbd44;
    color: #50607c;
}

#delete-btn:hover{
    color: black;
}
#back-btn:hover{
    color: black;
}
</style>