export default {
    namespaced: true,
    state: {
        time: {
            minu: 0,
            seco: 0,
        }
    },
    mutations: {
        setTime(state, payload) {
            state.time = payload;
        },
    }
}