
import buildLexer from './buildLexical'

export {
    buildLexer
}

// const content = `
// function buildLexer(code) {
//     if(typeof code !== 'string') {
//         return new Error('error!')
//     }

//     let tokens = []
//     let char, type
//     let index = 0
//     while(index < code.length) {
//         char = code[index]

//         if(isKeyword(char)) type = 'keyword'
//         if(/\[a-z]/.test(char)) type = 'identifier'
//         if(isOperator(char)) type = 'operator'
//         if(isBoundary(char)) type += 'boundary'

//         tokens.push({ type, value: char })
//         index++
//     }
//     return tokens
// }
// `

// let tokens = buildLexer(content)

// console.log(tokens);

