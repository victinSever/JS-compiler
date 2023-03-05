import { createStore } from 'vuex';


export default createStore({
    state() {
        return {
            code: '', //源码
            tokens: [], //tokens
            ast: '', //AST树
            diplayStack: [], //操作栈
        }
    },
    mutations: {
        UpdateCode(state, payload) {
            state.code = payload
        },
        UpdateTokens(state, payload) {
            state.tokens = payload
            console.log(state, payload);
        },
        UpdateAST(state, payload) {
            state.ast = payload
            console.log(state, payload);
        },
    },
    getters: {
        code(state) {
            return state.code
        }
    }
})