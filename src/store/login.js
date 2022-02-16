import * as userApi from "@/api/user.js";

export default {
    namespaced: true,
    state: {
        loading: false,
        user: null,
        // user: {
        //     name: "管理员"  // 暂时改一下
        // }
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async login(ctx, payload) {
            ctx.commit("setLoading", true);
            await userApi.login(payload.loginId, payload.loginPwd);
            ctx.commit("setUser", resp);
            ctx.commit("setLoading", false);
            return resp;
        },
        async whoAmI(ctx) {
            ctx.commit("setLoading", true);
            const resp = await userApi.whoAmI();
            ctx.commit("setUser", resp);
            ctx.commit("setLoading", false);
        },
        async loginOut(ctx) {
            ctx.commit("setLoading", true);
            await userApi.loginOut();
            ctx.commit("setUser", null);
            ctx.commit("setLoading", false);
        },
    }
}