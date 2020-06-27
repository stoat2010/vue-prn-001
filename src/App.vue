<template>
  <div id="app">
    <devcard></devcard>
    <devcard></devcard>
    <devcard></devcard>
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
  @font-face {
    font-family: 'playregular';
    src: url('assets/fonts/play-v11-latin_cyrillic-ext_cyrillic-regular.woff2') format('woff2'),
    url('assets/fonts/play-v11-latin_cyrillic-ext_cyrillic-regular.woff') format('woff'),
    url('assets/fonts/Play-Regular.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'playbold';
    src: url('assets/fonts/play-v11-latin_cyrillic-ext_cyrillic-regular.woff2') format('woff2'),
    url('assets/fonts/play-v11-latin_cyrillic-ext_cyrillic-regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
#app {

  font-family: playregular;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background: #f2f2f2;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
