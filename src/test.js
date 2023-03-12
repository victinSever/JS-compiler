

const { lexicalAnalysis } = require('./compiler')

const content = 
`
21312 12 213
21312
321
12
`

const { tokens, error } = lexicalAnalysis(content)

console.log('Tokens数组:');
console.log(tokens);
console.log('\nError数组:');
console.log(error);
