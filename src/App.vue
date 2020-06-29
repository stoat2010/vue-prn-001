<template>
  <div id="app">
    <template v-if="devLength>0">
      <devcard v-for="device in this.allDevices" :key="device._id" v-bind:device="device"></devcard>
    </template>
  <template v-else>
    <Error></Error>
  </template>
  </div>
</template>

<script>

import Devcard from "./components/Devcard";
import Error from "./components/Error"


import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    Devcard,
    Error
  },
  computed: mapGetters(['allDevices', 'devLength']),
  methods: mapActions(['fetchDevices']),
  mounted() {
    this.fetchDevices()
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
