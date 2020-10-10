<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "~@fortawesome/fontawesome-free/css/fontawesome.min.css";
@import "~@fortawesome/fontawesome-free/css/solid.min.css";
</style>

<script>
// @ is an alias to /src
import axios from "axios";


export default {
  name: 'Home',
  components: {

  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken');
  }
}
</script>
