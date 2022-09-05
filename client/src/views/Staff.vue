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
    <div>
        <Nav/>
        <div :style="{'margin-left': sidebarWidth}" id="wrapper">

          <!-- contenuto pagina qui -->
          <h1>staff page</h1>

        </div>
    </div>
</template>

<style scoped>
#wrapper{
  padding: 0.25em;
  padding-left: 0.8em;
}
</style>