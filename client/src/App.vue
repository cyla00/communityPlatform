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
  background: #0F121D;
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


::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #242C35;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #536479;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #8697ac;
}

</style>
