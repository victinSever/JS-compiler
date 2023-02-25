const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const filename = path.resolve(__dirname, '../file/code.json')

async function readFileData(filename) {
    try {
        const data = await readFile(filename, {
            encoding: 'utf-8'
        })
        console.log('file：文件读取成功！');
        return JSON.parse(data)
    } catch (e) {
        console.log(e);
    }
}

async function writeFileData(filename, content) {
    try {
        const data = await writeFile(filename, JSON.stringify(content))
        console.log('file：文件存储成功！');
        return data
    } catch (e) {
        console.log(e);
    }
}

async function saveCode(content) {
    const res = await writeFileData(filename, content) 
    const data = {
        code: 200,
        data: res || null,
        msg: 'success'
    };
    return data;
}

async function getCode() {
    const content = await readFileData(filename)  
    const data = {
        code: 200,
        data: content,
        msg: 'success'
    };
    return data;
}

module.exports = {
    saveCode,
    getCode
}