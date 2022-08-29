<script>
import 'boxicons/css/boxicons.min.css'

export default{
  name: 'App',
}
</script>


<template>
  <router-view/>
</template>

<style>
:root{
  --background: #262B2F;
  --nav-background: #222323;
  --text-light: #d9d9d9;
  --blue-background: #110B19;
}

body{
  margin: 0;
  padding: 0;
  background: #060304;
}
#app {
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
</style>
