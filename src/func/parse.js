/**
 * 定义一个函数，用于将词法单元转换为抽象语法树
 * @param {*} tokens 
 * @returns 
 */
export default function parse(tokens) {
    // 定义一个变量，用于存储当前扫描的位置
    let current = 0;
    // 定义一个函数，用于获取当前扫描的词法单元
    function getToken() {
      return tokens[current];
    }
    // 定义一个函数，用于移动当前扫描的位置
    function move() {
      current++;
    }
    // 定义一个函数，用于构建抽象语法树
    function buildTree() {
      // 获取当前扫描的词法单元
      let token = getToken();
      // 如果当前词法单元是关键字，则构建一个节点
      if (token.type === 'keyword') {
        let node = {
          type: 'keyword',
          value: token.value
        };
        // 移动当前扫描的位置
        move();
        // 返回节点
        return node;
      }
      // 如果当前词法单元是标识符，则构建一个节点
      if (token.type === 'identifier') {
        let node = {
          type: 'identifier',
          value: token.value
        };
        // 移动当前扫描的位置
        move();
        // 返回节点
        return node;
      }
      // 如果当前词法单元是运算符，则构建一个节点
      if (token.type === 'operator') {
        let node = {
          type: 'operator',
          value: token.value
        };
        // 移动当前扫描的位置
        move();
        // 返回节点
        return node;
      }
      // 如果当前词法单元是界符，则构建一个节点
      if (token.type === 'delimiter') {
        let node = {
          type: 'delimiter',
          value: token.value
        };
        // 移动当前扫描的位置
        move();
        // 返回节点
        return node;
      }
    }
    // 返回抽象语法树
    return buildTree();
  }