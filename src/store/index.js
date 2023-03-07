import { createStore } from 'vuex';


export default createStore({
    state() {
        return {
            code: '', //源码
            tokens: [], //tokens
            ast: '', //AST树
            diplayStack: [], //操作栈
            viewStatus: {
                output: true,
                error: true
            }
        }
    },
    mutations: {
        UpdateCode(state, payload) {
            state.code = payload
        },
        UpdateTokens(state, payload) {
            state.tokens = payload
        },
        UpdateAST(state, payload) {
            state.ast = payload
        },
        UpdateOutputStatus(state, payload) {
            state.viewStatus.output = payload
        },
        UpdateErrorStatus(state, payload) {
            state.viewStatus.error = payload
        },
    },
    getters: {
        code(state) {
            return state.code
        },
        viewStatus(state) {
            return state.viewStatus
        },
    }
})