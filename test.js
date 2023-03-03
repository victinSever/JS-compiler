// let str = `
//     function foo() {
//         let str = 'Hello, world!';
//         let regex = /regex[abc]*./gm;
//         let template = \`This is a template string.\`;
//         let result = 'The quick brown fox.' + \`jumps over the \` // Lazy dog.
//         let ignored = "This is a\nmulti-line // Commented text.
// string with ignored parts." + "More string";
//         return str + regex + template + result;
//     }
// `;
// let regex = /(['"`])(?:\\\1|.)*?\1/g;
// let matches = str.match(regex);
// console.log(matches);

const str = "123 123.45 -123.45 -0.123 .456 -.123 10000000000000000000 1 0 -1 -10";
const regex = /-?\d+(\.\d+)?/g;
const matches = str.match(regex);
console.log(matches);

const a = +1
const b = -1
console.log(a+b);