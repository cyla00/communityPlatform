<script>
export default{
  name: 'Profile',
  data(){
    return{
        image: 'https://i.ibb.co/5hbFmdF/New-Project.png',
        error_message: '',
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
        }, 5000)
      }
    },
    onPickFile(){
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      if(!this.image.type === "image/png" || !this.image.type === "image/jpeg" || !this.image.type === "image/webp") {
        this.correctForm = false
        this.resetErrorMessage()
        return this.error_message = 'The picture has to be jpg/png/webp format'
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
        this.image = rawImg
      }
      reader.readAsDataURL(this.image)
    },
    removePic(){
      this.image = 'https://i.ibb.co/5hbFmdF/New-Project.png'
    },
  },
  created(){
    
  }
}
</script>

<template>
    <div id="wrapper">
        <div id="set-image-wrapper">
          <div id="image-wrapper">
            <img id="image" :src="image" alt="">
          </div>
          <div id="img-text-wrapper">
            <button @click="removePic"><i class='bx bx-x bx-md'></i></button>
            <button class="btn-img" @click="onPickFile"><i class='bx bxs-file-find bx-sm'></i>Upload picture</button>
            <input type="file" style="display: none" ref="fileInput" accept="image/png,image/jpeg" @change="onFilePicked"/>
          </div>
        </div>
        <Teleport to="body">
            <Transition>
            <div id="modal" v-if="!correctForm">
                <p id="img-err-p"><i class='bx bx-error bx-sm'></i>{{error_message}}<i class='bx bx-error bx-sm'></i></p>
            </div>
            </Transition>
        </Teleport>
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

#modal{
    position: absolute;
    z-index: 3;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background: #d9d9d9;
    color: #F40552 !important;
    color: black;
    font-family: Poppins;
    font-weight: bold;
    padding: 0.5em;
    border-bottom-left-radius: 5px;
    text-align: center;
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


#img-err-p{
  margin: auto;
}

#set-image-wrapper{
  padding: 2em;
}
#image-wrapper{
  background: rgba(25, 53, 59, 0.5);
  width: 10em;
  height: 10em;
  border-radius: 100%;
  border: solid 2px #50607c;
  overflow: hidden;
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