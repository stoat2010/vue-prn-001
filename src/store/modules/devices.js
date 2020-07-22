export default {
    actions: {
        async fetchDevices(ctx) {
            const res = await fetch('http://172.25.0.22:3333/api/devices')
            const devices = await res.json()
            ctx.commit('updateDevs', devices)
        },
        async fetchGraphs(ctx, device) {
            const res = await fetch('http://172.25.0.22:3333/api/datagraph/' + device[0] + '/'+ device[1] +'/')
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
        },
        addPopup(state, popup){
            state.popups.push(popup)
        },
        delPopup(state, id){
            console.log(id)
            state.popups = state.popups.filter(elem=>elem.id != id)
        },
        toggleBlur(state, blur){
            state.blur = !blur
            state.showAdd =!state.showAdd
            state.showDash = false
            console.log(state.blur)
        },
        toggleDash(state, blur){
            state.blur = !blur
            state.showAdd = false
            state.showDash = !state.showDash
            console.log(state.blur)
        }
    },
    state: {
        devices: [],
        length: 0,
        graphs: {},
        popups: [],
        blur: false,
        showAdd: false,
        showDash: false,
    },
    getters: {
        allDevices(state){
            return state.devices.filter(elem=>elem.inreport === true/* && elem.convenience === true*/)
        },
        devLength(state){
            return state.devices.length
        },
        devGraphs(state){
            return state.graphs.prouts
        },
        getPopups(state) {
            return state.popups
        },
        getBlur(state) {
            return state.blur
        },
        getAdd(state) {
            return state.showAdd
        },
        getDash(state) {
            return state.showDash
        },
        allPrintouts(state) {
            let allPrns = 0
            state.devices/*.filter(elem=>elem.inreport === true)*/.map(elem=>
                allPrns = allPrns + elem.result.printouts - elem.result.start_printouts
            )
            return allPrns
        }
    },
}