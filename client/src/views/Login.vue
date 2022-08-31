<script>
import Footer from '@/components/Footer.vue'
import {default as country_list} from './country_list.json'

export default{
  name: 'Login_page',
  components: {
    Footer,
  },
  data(){
    return{
      email: null,
      password: null,
      day: null,
      month: null,
      year: null,
      country: null,
      countries: country_list,
      secureCode: null,
      viewMethod: null,
    }
  },
}
</script>

<template>
    <div>
        <div>
          <input type="text" v-model="email">
          <input type="text" v-model="password">

          <div id="birth-date-wrapper">
            <input type="text" v-model="day">
            <input type="text" v-model="month">
            <input type="text" v-model="year">
          </div>
          
          <select v-model="country">
            <option disabled value="">Select your country</option>
            <option value="" v-for="i in countries" v-bind:key="i">{{i}}</option>
          </select>
        </div>
        login page
        <Footer/>
    </div>
</template>

<style scoped>

</style>