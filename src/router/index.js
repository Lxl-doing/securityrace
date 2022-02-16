import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    if (!store.state.login.user && localStorage.getItem("user")) {
        store.commit(
            "login/setUser",
            JSON.parse(localStorage.getItem("user"))
        );
    }
    if (store.state.login.user) {
        next();
        return;
    }
    else if (to.path != '/login') {
        next({
            path: '/login'
        });
        return;
    }
    next();
})

export default router;