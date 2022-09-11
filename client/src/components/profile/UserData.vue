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
    }
  },
  components: {

  },
  methods: {
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
  },
  async created(){
    await this.getUserData() 
    socket.on('user_data', async (data) => {
        this.users.splice(0, this.users.length, ...data)
        
        let context_user = this.users.find(element => element.id === localStorage.getItem('id'))
        console.log(context_user);
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
  }
}
</script>

<template>
    <div id="wrapper">
        <h3>User credentials</h3>
        <div class="input-wrapper">
            <div>
                <label for="username">username</label>
                <input type="text" v-model="username" class="data-input">
            </div>
            
            <div>
                <label for="email">email</label>
                <input type="text" v-model="email" class="data-input">
            </div>
            
        </div>
        
        <div class="input-wrapper">
            <div>
                <label for="password">Change password</label>
                <input type="password" v-model="old_password" class="data-input" placeholder="password">
                <input type="password" v-model="new_password" class="data-input" placeholder="new password">
            </div>
        </div>

        <h3>your links</h3>
        
        <div class="input-wrapper">
            <div>
                <label for="address">address</label>
                <input type="text" v-model="address" class="data-input">
            </div>
            
            <div>
                <label for="city">City</label>
                <input type="text" v-model="city" class="data-input">
            </div>
            
            <div>
                <label for="city">City</label>
                <input type="text" v-model="zip_code" class="data-input">
            </div>
            
            <div>
                <label for="country">Country</label>
                <input type="context_user" v-model="country" class="data-input" readonly>
            </div>
        </div>
        
        <div class="input-wrapper">
            <div>
                <i class='bx bxl-steam bx-md'></i><input type="text" v-model="steam" class="data-input" placeholder="steam link">
            </div>
            
            <div>
                <i class='bx bxl-discord bx-md' ></i><input type="text" v-model="discord" class="data-input" placeholder="username#0000">
            </div>
            
            <div>
                <i class='bx bxl-twitch bx-md' ></i><input type="text" v-model="twitch" class="data-input" placeholder="twitch channel">
            </div>
            
            <div>
                <i class='bx bxl-youtube bx-md' ></i><input type="text" v-model="youtube" class="data-input" placeholder="youtube channel">
            </div>
            
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
    text-align: center;
}
.success{
    background: #d9d9d9;
    color: #00ca4e !important;
}




#wrapper{
    width: 50em;
    height: 100%;
    margin: auto;
    margin-top: 2em;
    justify-content: center;
    align-content: center;
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

.input-wrapper{
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

h3{
    color: #F40552;
    font-weight: bold;
}

::placeholder {
  color: rgba(217, 217, 217, 0.5);
}
</style>