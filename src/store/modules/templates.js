export default {
    actions: {
        async fetchTemplates(ctx) {
            const res = await fetch('http://172.25.0.22:3333/api/templates')
            const templates = await res.json()
            ctx.commit('updateTemps', templates)
        },
    },
    mutations: {
        updateTemps(state, templates){
            state.templates = templates
        },
    },
    state: {
        templates: [],
    },
    getters: {
        allTemplates(state){
            return state.templates
        },
    },
}