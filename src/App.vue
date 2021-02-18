<template>
  <img class="logo" src="./assets/logo.png" alt="">
  <Posts />
  <ActivityLog />
</template>

<script>
import ActivityLog from './components/ActivityLog.vue'
import Posts from './components/Posts.vue'

export default {
  name: 'App',
  components: {
    ActivityLog,
    Posts,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  width: 100px
}

ol {
  text-align: left;
}
</style>
