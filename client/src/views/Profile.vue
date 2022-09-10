<script>
import Header from '@/components/GenHeader.vue'
import ProfileImg from '@/components/profile/UserImg.vue'

export default{
  name: 'Profile',
  data(){
    return{
      image: null,
      error_message: '',
      correctForm: true,
    }
  },
  components: {
    Header,
    ProfileImg,
  },
  methods: {
    
  },
  created(){
    
  }
}
</script>

<template>
    <div id="wrapper">
        <Header/>
        <ProfileImg/>
    </div>
</template>

<style scoped>

</style>