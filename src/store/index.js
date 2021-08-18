import Vue from 'vue'
import Vuex from 'vuex'
import md5 from 'js-md5'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        isLogin: false,
        userInfo: {}
    },
    getters: {
    },
    mutations: {
        onLogin: (state, userInfo) => {
            state.isLogin = true
            state.userInfo = userInfo
        },
        onLogout: (state) => {
            state.isLogin = false
            state.userInfo = {}
        },
    },
    actions: {},
})
