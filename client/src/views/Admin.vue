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
        <div :style="{'margin-left': sidebarWidth}">

          <!-- contenuto pagina qui -->
          <h1>admin page</h1>

        </div>
    </div>
</template>

<style scoped>

</style>