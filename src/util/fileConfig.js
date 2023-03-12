const path = require('path')
const fs = require('fs')

const filename_code = path.resolve(__dirname, '../file/code.txt')
const filename_log = path.resolve(__dirname, '../file/log.txt')
const folderPath = path.resolve(__dirname, '../file/folder')


module.exports = {
    filename_code,
    filename_log,
    folderPath
}