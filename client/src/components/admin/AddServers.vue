<script>
const axios = require('axios')



const auth = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}

export default{
  name: 'Servers',
  data(){
        return{
            servers: [],
            title: '',
            host: '',
            port: '',
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
        async addServer(){
            if(this.title === '' || this.host === '' || this.port === ''){
                this.error_message = 'please fill all fields'
                this.correctForm = false
                return this.resetErrorMessage()
            }

            const data = {
                title: this.title,
                host: this.host,
                port: this.port,
            }

            await axios.post('http://localhost:3000/api/add-server', data, auth).then(res => {
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
        async deleteServer(id){
            if(!confirm("Are you sure?")) return
            const data = {
                id: id
            }
            await axios.post('http://localhost:3000/api/remove-server', data, auth).then(res => {
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
    },
    async created(){
        
        const auth = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        await axios.post('http://localhost:3000/api/update-servers-data', {}, auth).then((result) => {
            if(result.data.length === 0) return this.empty = true
            this.servers = result
        }).catch((err) => {
            return this.empty = true
        })
    }
}
</script>

<template>

    <div id="wrapper">
        <h1>Servers</h1>
        <input type="text" v-model="title" placeholder="Server title">
        <input type="text" v-model="host" placeholder="host">
        <input type="text" v-model="port" placeholder="port">
        <button class="add_server" @click="addServer">add server</button>

        <div class="servers-wrapper" v-for="i in this.servers.data" :key="i">
            <p class="title">{{i.title}}</p>
            <p>{{i.host}}:{{i.port}}</p>
            <button class="remove_server" @click="deleteServer(i.id)">remove server</button>
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
.servers-wrapper{
    display: flex;
    height: 100%;
    margin: auto;
}

.remove_server{
    margin: auto;
    background: #ff605c;
    border-radius: 5px;
}
.add_server{
    background: #00ca4e;
    border-radius: 5px;
    margin: auto;
}

button:hover{
    color: #d9d9d9;
}
</style>