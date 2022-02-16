export default {
    namespaced: true,
    state: {
        tit1: "服务器处理失败",
        tit2: "请重新提交",
        desc: "考试结束时没有交卷，系统会以最后一次保存的答题记录计算最终成绩",
        hasBtn: false,
        isSuccess: false,
    },
    mutations: {
        setTit1(state, payload) {
            state.tit1 = payload;
        },
        setTit2(state, payload) {
            state.tit2 = payload;
        },
        setDesc(state, payload) {
            state.desc = payload;
        },
        setHasBtn(state, payload) {
            state.hasBtn = payload;
        },
        setIsSuccess(state, payload) {
            state.isSuccess = payload;
        },
    }
}