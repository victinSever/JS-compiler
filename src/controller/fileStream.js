
const {
    writeFileData,
    readFileData
} = require('../util/fileIO')
const { judgeParam } = require('../util/apiJudge')
const { filename } = require('../util/fileConfig')


/**
 * 保存文件
 * @param {String} content 待保存的code字符串
 * @returns 
 */
async function saveCode(content) {
    const judge = judgeParam(content)
    if (judge.code !== 200) {
        return judge
    }
    const res = await writeFileData(filename, content)
    return {
        code: 200,
        data: res || null,
        msg: '文件保存成功！'
    }
}

/**
 * 获取文件内容
 * @returns 
 */
async function getCode() {
    const content = await readFileData(filename)
    return {
        code: 200,
        data: content,
        msg: '文件读取成功！'
    }
}

module.exports = {
    saveCode,
    getCode,
}