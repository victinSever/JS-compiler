const acorn = require('acorn')
const parse = (tokens) => {
    let ast = acorn.parse(tokens)
    return util.inspect(ast, {depth: null}) 
}

module.exports = parse