<script>
import Header from '@/components/GenHeader.vue'
import AddGames from '@/components/admin/AddGames.vue'
import AddServers from '@/components/admin/AddServers.vue'

export default{
  name: 'Admin',
  data(){
    return{

    }
  },
  components: {
  Header,
  AddGames,
  AddServers,
  }
}
</script>

<template>
    <div id="wrapper">
        <Header/>
        <div id="inner">
          <AddGames/>
          <AddServers/>
        </div>
        
    </div>
</template>

<style scoped>
#inner{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>