/**
 * JS运算符
 */

// 算术运算符
export const arithmetic_operators = [
    '+',
    '-',
    '*',
    '/',
    '%',
    '++',
    '--'
]

// 赋值运算符
export const assignment_operator = [
    '=',
    '+=',
    '-=',
    '*=',
    '/=',
    '%='
]

// 比较运算符
export const comparison_operator = [
    '==',
    '===',
    '!=',
    '!==',
    '>',
    '<',
    '>=',
    '<=',
    '?'
]

// 逻辑运算符
export const logical_operator = [
    '&&',
    '||',
    '!'
]

// 类型运算符
export const type_operator = [
    'typeof',
    'instanceof'
]

// 位运算符
export const bitwise_operator = [
    '&',
    '|',
    '~',
    '^',
    '<<',
    '>>',
    '>>>',
]

export default [
    ...arithmetic_operators,
    ...assignment_operator,
    ...bitwise_operator,
    ...comparison_operator,
    ...logical_operator,
    ...type_operator
]

