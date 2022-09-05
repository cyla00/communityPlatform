<script>
import Nav from '@/components/Nav.vue'
import {sidebarWidth} from '../components/state'

export default{
  name: 'Games',
  data(){
    return{
      sidebarWidth,
    }
  },
  components: {
    Nav,
  }
}
</script>

<template>
    <div id="main">
        <Nav/>
        <div :style="{'margin-left': sidebarWidth}" id="wrapper">

          <!-- contenuto pagina qui -->
          <h1>admin page</h1>

        </div>
    </div>
</template>

<style scoped>
#main{
  height: 100vh;
  width: 100vw;
  background: #161923;
}

#wrapper{
  padding: 0.25em;
  padding-left: 0.8em;
}
</style>