<script>
const axios = require('axios')



const auth = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}

export default{
  name: 'Games',
  data(){
        return{
            games: [],
            empty: false,
            new_title: '',
            image: '',
            error_message: '',
            success_message: '',
            correctForm: true,
            success: false,
        }
    },
    methods: {
        resetErrorMessage(){
            if(this.correctForm === false){
                setTimeout(() => {
                    this.correctForm = true
                }, 3000)
            }
        },
        resetSuccessMessage(){
            if(this.success){
                setTimeout(() => {
                    this.success = false
                }, 3000)
            }
        },
        async addGame(){
            let data = new FormData()
            const imgType = this.image.type.split('/')[1]
            data.append('file', this.image, `${this.new_title}.${imgType}`)

            await axios.post('http://localhost:3000/api/add-game', data, auth).then(res => {
                console.log(res);
                this.success_message = res.data.success_message
                this.success = true
                this.resetSuccessMessage()
                return location.reload()
            }).catch(err => {
                this.error_message = err.response.data.error_message
                this.correctForm = false
                return this.resetErrorMessage()
            })
        },
        async deleteGame(id){

            const data = {
                id: id
            }
            console.log(data);
            await axios.post('http://localhost:3000/api/remove-game', data, auth).then(res => {
                this.success_message = res.data.success_message
                this.success = true
                this.resetSuccessMessage()
                return location.reload()
            }).catch(err => {
                this.error_message = err.response.data.error_message
                this.correctForm = false
                return this.resetErrorMessage()
            })
        },
        addServer(id){

        },
        onFilePicked(event){
            const files = event.target.files
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
            if(!this.image.type === "image/png" || !this.image.type === "image/jpeg") {
                this.correctForm = false
                this.resetErrorMessage()
                return this.error_message = 'The picture has to be jpg/png format'
            }
            if(this.image.size > 3000000) {
                this.correctForm = false
                this.resetErrorMessage()
                return this.error_message = 'The picture has to be less than 3 mb'
            }
        },
    },
    async created(){
        
        const data = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        await axios.post('http://localhost:3000/api/update-games-data', {}, data).then((result) => {
            if(result.data.length === 0) return this.empty = true
            this.games = result
        }).catch((err) => {
            return this.empty = true
        })
    }
}
</script>

<template>

    <div id="wrapper">
        <h1>games</h1>
        <input type="text" v-model="new_title" placeholder="new game title">
        <input type="file" ref="fileInput" accept="image/png,image/jpeg" @change="onFilePicked"/>
        <button class="add_game" @click="addGame">add game</button>

        <div class="games-wrapper" v-for="i in this.games.data" :key="i">
            <p class="title">{{i.title}}</p>
            <div class="dropdown">
                <div v-for="server in i.server_data" :key="server" class="server-wrapper">
                    <p>{{server.host}}:{{server.port}}</p>
                    <button class="remove_server">Remove server</button>
                </div>
            </div>
            <button class="add_server">add server</button>
            <button class="remove_game" @click="deleteGame(i.id)">remove Game</button>
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
    border-bottom-right-radius: 5px;
    text-align: center;
}
.success{
    background: #d9d9d9;
    color: #00ca4e !important;
}


#wrapper{
    display: grid;
    grid-template-rows: 1fr;
    margin: auto;
    margin-top: 0.5em;
    padding: 1em;
    grid-gap: 0.5em;
}
input{
    margin: auto;
    width: 20em;
}
.title{
    margin: auto;
    margin-right: 0.5em;
    
}
.games-wrapper{
    display: flex;
    height: 100%;
    margin: auto;
}
.server-wrapper{
    display: flex;
    flex-direction: row;
    margin: auto;
}

.remove_game{
    margin: auto;
    background: #ff605c;
    border-radius: 5px;
}
.remove_server{
    background: #ff605c;
    border-radius: 5px;
    margin: auto;
    margin-left: 0.5em;
}
.add_game{
    background: #00ca4e;
    border-radius: 5px;
    margin: auto;
}
.add_server{
    margin: auto;
    background: #00ca4e;
    border-radius: 5px;
}

button:hover{
    color: #d9d9d9;
}
</style>