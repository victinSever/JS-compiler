<template>
  <div class="container">
    <div v-html="content" class="markdown-body"></div>
  </div>
</template>

<script>
import {marked} from 'marked'
import 'github-markdown-css';
const content = `# JS-compiler 
本项目是Javascript编译器网页版，包含了前端和后端的实现。

## 技术栈简介
- 前端技术栈：Vue3 + webpack + vue-router + vuex + element-plus + vue-codemirror
- 后端技术栈：node.js 16 + express + mongodb

## 功能实现
- JS语法分析
- JS词法分析
- JS中间代码生成
- JS目标代码生成
- 文件加载（后端实现）
- 文件保存
- 日志记录
- 报错提示

## 架构设计
文档正在完善中···

## 部署地址
暂无

## 相关文档
文档正在完善中···`;

export default {
  name: "document-page",
  computed: {
    content() {
      console.log(marked(content));
      return marked(content)
    },
  },
};
</script>

<style scoped lang='scss'>
.container {
  display: flex;
  justify-content: center;

  .markdown-body {
    margin-top: 5rem;
    width: 80%;
  }
}
</style>