import {createStore} from 'vuex';

// import display from './display';

export default createStore({
    state() {
        return {
            code: '', //源码
            diplayStack: [], //操作栈
        }
    },
    mutations: {
        HandleUpdateCode(state, payload) {
            state.code = payload
        }
    },
    getters: {
        code(state) {
            return state.code
        }
    }
})