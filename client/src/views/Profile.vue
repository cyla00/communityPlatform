<script>
import Header from '@/components/GenHeader.vue'
import ProfileImg from '@/components/profile/UserImg.vue'
import UserData from '@/components/profile/UserData.vue'

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
    UserData,
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
        <UserData/>
    </div>
</template>

<style scoped>

</style>