<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Es6Learning/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Es6Learning from './components/Es6Learning'

export default {
  name: 'App',
  components: {
    Es6Learning
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
