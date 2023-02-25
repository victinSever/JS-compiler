import {createStore} from 'vuex';

export default createStore({
    namespace: 'true',
    state() {
        return {
            code: '', //源码
            diplayStack: [], //操作栈
        }
    },
    mutations: {
        HandleUpdateCode(_, payload) {
            console.log(_, payload);
        }
    },
    getters: {
        code(state) {
            return state.code
        }
    }
})