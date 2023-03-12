

//导入分析器
const {
    Lex,
    syntaxAnalysis 
} = require('../compiler')
const { judgeParam } = require('../util/apiJudge')

/**
 * 语法分析
 * @param {Array} tokens 
 * @returns 
 */
function getSyntax(tokens) {
    const judge = judgeParam(tokens)
    if(judge.code !== 200) {
        return judge
    }
    const res = syntaxAnalysis(tokens)
    return {
        code: 200,
        data: res || null,
        msg: '语法分析结果！'
    }
}

/**
 * 词法分析
 * @param {String} content 
 * @returns 
 */
function getLexical(content) {
    const judge = judgeParam(content)
    if(judge.code !== 200) {
        return judge
    }
    const { tokens, error } = new Lex(content).build()
    return {
        code: 200,
        tokens: tokens || null,
        error: error,
        msg: '词法分析结果！'
    }
}

module.exports = {
    getLexical,
    getSyntax
}