<script>
import Footer from '@/components/Footer.vue'

export default{
  name: 'Home',
  components: {
    Footer,
  }
}
</script>

<template>
    <div>
        <nav>
            <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/registration">Join us</a></li>
            </ul>
        </nav>
        <Footer/>
    </div>
</template>

<style scoped>

</style>