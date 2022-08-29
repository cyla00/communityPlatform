<script>
import Nav from '@/components/Nav.vue'
import {sidebarWidth} from '../components/state'

export default{
  name: 'Logged',
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
        <div :style="{'margin-left': sidebarWidth}">

          <!-- contenuto pagina qui -->
          <h1>shop</h1>

        </div>
    </div>
</template>

<style scoped>

</style>