<script>
import Header from '@/components/GenHeader.vue'
import AddGames from '@/components/admin/AddGames.vue'

export default{
  name: 'Admin',
  data(){
    return{

    }
  },
  components: {
  Header,
  AddGames,
  }
}
</script>

<template>
    <div id="wrapper">
        <Header/>
        <AddGames/>
    </div>
</template>

<style scoped>

</style>