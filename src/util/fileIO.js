
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function readFileData(filename) {
    try {
        const data = await readFile(filename, {
            encoding: 'utf-8'
        })  
        console.log('file：文件读取成功！');
        return data
    } catch (e) {
        console.log(e);
    }
}

async function writeFileData(filename, content) {
    try {
        const data = await writeFile(filename, content)
        console.log('file：文件存储成功！');
        return data
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    readFileData,
    writeFileData
}