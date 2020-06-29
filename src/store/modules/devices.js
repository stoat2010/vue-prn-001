export default {
    actions: {
        async fetchDevices(ctx) {
            const res = await fetch('http://172.25.0.22:3333/api/devices')
            const devices = await res.json()
            ctx.commit('updateDevs', devices)
        }
    },
    mutations: {
        updateDevs(state, devices){
            state.devices = devices
        }
    },
    state: {
        devices: [],
        length: 0,
    },
    getters: {
        allDevices(state){
            return state.devices.filter(elem => elem.convenience === true)
        },
        devLength(state){
            return state.devices.length
        }
    },
}