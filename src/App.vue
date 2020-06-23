<template>
  <div id="app">
    <devcard></devcard>
  </div>
</template>

<script>

import Devcard from "./components/Devcard";

export default {
  name: 'App',
  components: {
    Devcard

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
  margin: 0;
  padding: 0;
  background: #f2f2f2;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
