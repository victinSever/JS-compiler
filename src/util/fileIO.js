
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const appendFile = util.promisify(fs.appendFile)
const readdir = util.promisify(fs.readdir)

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

async function writeLog(filename, obj) {
    try {
        const data = await appendFile(filename, JSON.stringify(obj) + '\n')
        return data
    } catch (e) {
        console.log(e);
    }
}


async function readDir(folderPath) {
    try {
        const folder = await readdir(folderPath)
        return folder
    } catch (e) {
        console.log(e);
    }
}



module.exports = {
    readFileData,
    writeFileData,
    writeLog,
    readDir
}