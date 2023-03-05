
/**
 * 定义词法分析器函数
 * 
 */

const {
    keywordList, //关键字
    operatorList, //操作符
    ObjectList, //属性
    blankList, //空白
    delimiterList, //界符
    isKeyword,
    isOperator,
    isObject,
    isBlank,
    isDelimiter
} = require('./enum') 


/************************************************
 * 全局变量
 */

//全局索引
let cur = 0

//行数列数
let row = 1, col = 0

//文件数据
let content = ''

let contentLen = 0

//tokens
let tokens = []

//类型常量
const TYPE_KEYWORD = 'keyword' //关键字
const TYPE_IDENTIFIER = 'identifier' //标识符
const TYPE_OPERATOR = 'operator' //操作符
const TYPE_DELIMITER = 'delimiter' //界符
const TYPE_STRING = 'string' //字符串
const TYPE_NUMBER = 'number' //数值


/************************************************
 * 正则匹配
 */

//匹配字母或者下划线或者数字
const regexNum = /\d/
const regexAlpha = /[a-z]|[A-Z]/
const regexAlphaAndLine = /[a-z]|[A-Z]|_/
const regexAlphaAndLineAndNum = /[a-z]|[A-Z]|_|[0-9]/
//匹配任意八进制，十六进制，十进制或者科学计数法的数字
const regexNumber = /[-+]?(?:0[xX][\da-fA-F]+|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|0[0-7]*)/


// 匹配单行注释和多行注释
const regexSingleExplain = /\/\/.*$/ //单行注释
const regexMutiExplain = /\/\*[\s\S]*?\*\// //多行注释

//字符串匹配
const regexString = /(['"`])(?:\\\1|.)*?\1/


/************************************************
 * 功能函数
 */


//读取文件
function readFile(data) {
    if (typeof data !== 'string') {
        return new Error('The content is Error！')
    }
    content = data
    contentLen = data.length
}

//读取下一个
function next() {
    cur++
    col++
    //行列标记
    if (content[cur] === '\n') {
        row++
        col = 1
    }
}

//跳过n次读取
function passN(n) {
    while (n--) next()
}

//分析器 - 根据传入的第一个标识符获取完整标识符
function getKeyword(ch) {
    //不断读取，直到读取空格或者换行符分隔
    let word = ch
    while (regexAlphaAndLineAndNum.test(content[cur + 1])) {
        next()
        word += content[cur]
    }
    return word
}

//分析器 - 根据传入的第一个操作符获取完整操作符
function getOperator(ch) {
    //不断读取，直到读取空格或者换行符分隔
    let operator = ch
    while (isOperator(content[cur + 1])) {
        next()
        operator += content[cur]
    }
    return operator
}

// 匹配单行注释
function getSingleExplain(cur) {
    let begin = cur, end = cur
    while (content[end++] !== '\n');
    const lineStr = content.substring(begin, end)
    let i = 0
    while (i++ < lineStr.length - 1) {
        next()
    }
    return lineStr
}

// 匹配多行注释
function getMutiExplain(cur) {
    let leftStr = content.substring(cur, contentLen)
    let match = leftStr.match(regexMutiExplain)
    if (!match) throw Error('多行注释匹配出错！')
    let i = 0
    while (i++ < match[0].length - 1) {
        next()
    }
    return match[0]
}

//匹配字符串
function getString(cur) {
    let leftStr = content.substring(cur, contentLen)
    let match = leftStr.match(regexString)
    if (!match) throw Error('字符串匹配出错！')
    let i = 0
    while (i++ < match[0].length - 1) {
        next()
    }
    return match[0]
}

//匹配数字
function getNumber(cur) {
    let leftStr = content.substring(cur, contentLen)
    let match = leftStr.match(regexNumber)
    if (!match) throw Error('数值匹配出错！')
    let i = 0
    while (i++ < match[0].length - 1) {
        next()
    }
    return match[0]
}

//添加token对象
function addToken(type, value) {
    tokens.push({
        type,
        value,
        col: col - value.length,
        row
    })
}


function buildLexer(code) {
    //将文件读到全局并进行类型判断
    readFile(code)

    let char, type, word

    while (cur < content.length) {
        char = content[cur]
        word = ''

        //匹配字母或者下划线
        if (regexAlphaAndLine.test(char)) {
            //得到单词分词
            word = getKeyword(char)

            //判断是否在关键字词组中
            if (isKeyword(word) || isObject(char)) {
                type = TYPE_KEYWORD
            } else {
                type = TYPE_IDENTIFIER
            }
            addToken(type, word)
        }

        // 匹配到操作符
        else if (isOperator(char)) {
            //匹配到 /，注释全部跳过
            if (cur + 1 < contentLen && char === '/') {
                //匹配到单行注释
                if (content[cur + 1] === '/') {
                    getSingleExplain(cur)
                }
                // 匹配多行注释
                else if (content[cur + 1] === '*') {
                    getMutiExplain(cur)
                }
            }

            else {
                word = getOperator(char)
                type = TYPE_OPERATOR
                addToken(type, word)
            }
        }

        //匹配到数字
        else if (/[-+]|\d/.test(char)) {
            word = getNumber(cur)
            type  = TYPE_NUMBER
            addToken(type, word)
        }

        // 匹配到界符
        else if (isDelimiter(char)) {
            // 匹配字符串
            if (/['"`]/.test(char)) {
                word = getString(cur)
                type = TYPE_STRING
            }
            // 匹配其他界符
            else {
                word = char
                type = TYPE_DELIMITER
            }
            addToken(type, word)
        }

        //获取下一个字符        
        next()

    }
    return tokens
}

module.exports = buildLexer

