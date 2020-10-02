<template>
<div>
  <h1>This is the Landing Page</h1>
  <h2>You can <router-link :to="{name: 'Login'}">Login</router-link> or <router-link :to="{name: 'SignUp'}">Sign</router-link> Up</h2>
  <h2>Goto <router-link :to="{name: 'Home'}">Home Page</router-link></h2>
  <h2>Goto <router-link :to="{name: 'Editor'}">The Editor</router-link></h2>

  <h3>Waiting for the UI Design</h3>
</div>
</template>

<script>
export default {
name: "LandingPage"
}
</script>

<style scoped>

</style>
