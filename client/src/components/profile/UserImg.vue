<script>
const axios = require('axios')
const formData = require('form-data')

export default{
  name: 'Profile',
  data(){
    return{
      preview_image: 'https://i.ibb.co/5hbFmdF/New-Project.png',
      image: '',
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
    onPickFile(){
      this.$refs.fileInput.click()
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
      const reader = new FileReader()
      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.preview_image = rawImg
      }
      reader.readAsDataURL(this.image)
    },
    removePic(){
      this.preview_image = 'https://i.ibb.co/5hbFmdF/New-Project.png'
    },
    async saveImage(){
      if(!this.image){
        this.correctForm = false
        this.resetErrorMessage()
        return this.error_message = 'Please choose an image'
      }
      let data = new FormData()
      const imgType = this.image.type.split('/')[1]
      data.append('file', this.image, `${localStorage.getItem('id')}.${imgType}`)
      const auth = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
            }
        }

        await axios.post('http://localhost:3000/api/save-profile-image', data, auth).then(res => {
          if(res.status === 501){
            this.correctForm = false
            this.resetErrorMessage()
            return this.error_message = 'An error occurred, please retry later'
          }
          this.success = true
          this.resetSuccessMessage()
          return this.success_message = 'Avatar changed successfully'
          
        }).catch((err) => {
            return
      })
    }
  },
  created(){
    
  }
}
</script>

<template>
    <div id="wrapper">
        <div id="set-image-wrapper">
          <div id="image-wrapper">
            <img id="image" :src="preview_image" alt="">
          </div>
          <div id="img-text-wrapper">
            <button @click="removePic"><i class='bx bx-x bx-md'></i></button>
            <button class="btn-img" @click="onPickFile">Upload picture</button>
            <button class="btn-img" id="btn-save" @click="saveImage">Save</button>
            <input type="file" style="display: none" ref="fileInput" accept="image/png,image/jpeg" @change="onFilePicked"/>
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
.bx-error{
  margin-inline: 0.5em;
}
.bx-x{
    color: #ff605c;
    border-radius: 100%;
    border: solid 2px #50607c;
}
.bx-x:hover{
    background: #ff605c;
    color: #50607c;
    transition: 0.2s;
}

.btn-img{
  color: #d9d9d9;
  background-color: #50607c;
  padding: 0.5em;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 0.5em;
}
.btn-img:hover{
  color: #F40552;
  background-color: #50607c;
}

#btn-save{
  background-color: #00ca4e ;
}

#wrapper{
  background: #0a0c10;
  background-image: url('../../../public/bg.png');
  background-size: fill;
  background-position: center;
}

.img-err-p{
  margin: auto;
}

#set-image-wrapper{
  padding: 2em;
}
#image-wrapper{
  background: #19353b;
  width: 10em;
  height: 10em;
  border-radius: 100%;
  border: solid 2px #50607c;
  overflow: hidden;
  margin: auto;
}

#image{
  max-width: 100%;
  max-height: 100%;
  background-size: contain;
  background-position: center;
  margin: 0;
  padding: 0;
}

#img-text-wrapper{
 
}
</style>