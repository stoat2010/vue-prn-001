import Vue from 'vue'
import Vuex from 'vuex'

import device from './modules/devices'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        device: device,
    }
})