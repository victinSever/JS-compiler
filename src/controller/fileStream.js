
const {
    writeFileData,
    readFileData,
    writeLog,
    readDir
} = require('../util/fileIO')
const { judgeParam } = require('../util/apiJudge')
const { formateTime } = require('../util/date')
const { filename_code, filename_log, folderPath } = require('../util/fileConfig')

async function getFolder() {
    let folder = await readDir(folderPath)
    // 封装folder的格式
    folder = folder.map(item => {
        return {
            id: new Date().toString(),
            label: item,      
        }
    })
    return {
        code: 200,
        data: folder || null,
        msg: '文件目录获取成功！'
    }
}

getFolder()

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
    const res = await writeFileData(filename_code, content)
    writeLog(filename_log, {
        time: formateTime(new Date()),
        type: 'saveCode',
        dur: 'lex',        
        content: content.substring(0, 50) //只截取前50字符记录日志
    })
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
async function getCode(filename) {
    console.log(filename);
    if(filename) {
        filename = folderPath + '\\' + filename
    } else {
        filename = filename_code
    }
    const content = await readFileData(filename)
    writeLog(filename_log, {      
        time: formateTime(new Date()),
        type: 'getCode',
        dur: 'lex',
        content: content.substring(0, 50) //只截取前50字符记录日志
    })
    return {
        code: 200,
        data: content,
        msg: '文件读取成功！'
    }
}

module.exports = {
    saveCode,
    getCode,
    getFolder
}