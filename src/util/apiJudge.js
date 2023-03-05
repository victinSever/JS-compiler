
/**
 * 判断api
 * @param {any} param 
 * @returns 
 */
function judgeParam(param) {
    if(typeof param === 'string') {
        if(param.trim() === '') return {
            code: 400,
            msg: '参数为空！！'
        }
    }

    else if(param instanceof Array) {
        if(param.length === 0) return {
            code: 400,
            msg: '参数数组为空！！'
        }
    }

    return {
        code: 200,
        msg: 'success'
    }
}

module.exports = {
    judgeParam
}