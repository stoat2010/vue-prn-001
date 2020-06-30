export default {
    actions: {
        async fetchDevices(ctx) {
            const res = await fetch('http://172.25.0.22:3333/api/devices')
            const devices = await res.json()
            ctx.commit('updateDevs', devices)
        },
        async fetchGraphs(ctx, device, year) {
            const res = await fetch('http://172.25.0.22:3333/api/datagraph/' + device + '/2020/')
            const graphs = await res.json()
            ctx.commit('getGraphs', graphs)
        }
    },
    mutations: {
        updateDevs(state, devices){
            state.devices = devices
        },
        getGraphs(state, graphs){
            state.graphs = graphs
        }
    },
    state: {
        devices: [],
        length: 0,
        graphs: {},
    },
    getters: {
        allDevices(state){
            return state.devices.filter(elem => elem.inreport === true)
        },
        devLength(state){
            return state.devices.length
        },
        devGraphs(state){
            return state.graphs.prouts
        }
    },
}