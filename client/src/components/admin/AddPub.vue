<script>
const axios = require('axios')



const auth = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}

export default{
  name: 'Advertisement',
  data(){
        return{
            advertisements: [],
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
        async addAdvertisement(){
            if(this.new_title === ''){
                this.error_message = 'please fill all fields'
                this.correctForm = false
                return this.resetErrorMessage()
            }

            let data = new FormData()
            const imgType = this.image.type.split('/')[1]
            data.append('file', this.image, `${this.new_title}.${imgType}`)

            await axios.post('http://localhost:3000/api/add-advertisement', data, auth).then(res => {
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
        isPast(expiration){
            const today = new Date().toISOString()
            return expiration < today
        },
        async deleteAdvertisement(id){
            if(!confirm("Are you sure?")) return
            const data = {
                id: id
            }
            await axios.post('http://localhost:3000/api/remove-advertisement', data, auth).then(res => {
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
        await axios.post('http://localhost:3000/api/advertisements-data', {}, data).then((result) => {
            if(result.data.length === 0) return this.empty = true
            this.advertisements = result
        }).catch((err) => {
            return this.empty = true
        })
    }
}
</script>

<template>

    <div id="wrapper">
        <h1>Advertisements</h1>
        <input type="text" v-model="new_title" placeholder="advertisement banner title">
        <input type="file" ref="fileInput" accept="image/png,image/jpeg" @change="onFilePicked"/>
        <p>picture 5:1 ratio</p>
        <button class="add_game" @click="addAdvertisement">add advertisement</button>

        <div class="pub-wrapper" v-for="i in this.advertisements.data" :key="i">
            <p class="title">{{i.title}}</p>
            <p class="expired" v-if="isPast(i.expiration)">expired</p>
            <button class="remove_game" @click="deleteAdvertisement(i.id)">remove advertisement</button>
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
.expired{
    background: #d9d9d9;
    color: #F40552;
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
.pub-wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: auto;
    border: solid 1px black;
}
.remove_game{
    margin: auto;
    background: #ff605c;
    border-radius: 5px;
}
.add_game{
    background: #00ca4e;
    border-radius: 5px;
    margin: auto;
}

button:hover{
    color: #d9d9d9;
}
.title{
    margin: auto;
}
</style>