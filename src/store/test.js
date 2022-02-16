export default {
    namespaced: true,
    state: {
        titles: [],
        answer: [],
    },
    mutations: {
        setTitles(state) {
            state.titles = JSON.parse(localStorage.getItem("titles"));
        },
        setAnswer(state, payload) {
            state.answer = payload;
        }
    }
}