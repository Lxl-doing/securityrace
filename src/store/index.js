import Vue from "vue";
import Vuex from "vuex";
import login from "./login.js";
import test from "./test.js";
import submit from "./submit.js";
import time from "./time.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        login,
        test,
        submit,
        time,
    }
})

export default store;