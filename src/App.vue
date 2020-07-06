<template>
  <div id="app">
    <template v-if="devLength>0">
      <Navbar></Navbar>
      <div class="popups">
        <div class="popup" v-for="popup in this.getPopups">

          <h4>В устройстве: {{popup.device}}</h4>
          <p>заканчивается бумага в лотке: {{popup.tray}}</p>
        </div>
      </div>
      <div class="container">
        <devcard v-for="device in this.allDevices" :key="device._id" v-bind:device="device"></devcard>
      </div>
    </template>
  <template v-else>
    <Error></Error>
  </template>
  </div>
</template>

<script>

import Devcard from "./components/Devcard";
import Error from "./components/Error";
import Navbar from './components/Navbar';


import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    Devcard,
    Error,
    Navbar,
  },
  computed: mapGetters(['allDevices', 'devLength', 'getPopups']),
  methods: {
    ...mapActions(['fetchDevices']),
    stopTimer () {
      if (this.interval) {
        window.clearInterval(this.interval)
      }
    },
    startTimer () {
      this.stopTimer()
      this.interval = window.setInterval(() => {
        this.fetchDevices()
      }, 300000)
    }
  },
  mounted() {
    this.fetchDevices();
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
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
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .container {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 75%;
    min-height: 100vh;
    background-color: #9e9e9e;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .popups {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    position: fixed;
    top: 10px;
    left: 60px;
    width: 390px;
    height:100%;
    background-color: white;
  }
  .popups .popup{
    margin: 10px;
    width: 370px;
    height: 120px;
    background-color: white;
    color: rgb(216,77,110);
    border-radius: 5px;
    border: 1px solid rgb(216,77,110);
    box-shadow: 10px 10px 5px #dddddd;
  }
</style>
