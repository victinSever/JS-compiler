<template>
  <div class="ca-code">
    <div class="ca-code-inner_box">
      <div class="ca-code-editor">
        <codemirror
          v-model="code"
          placeholder="Code goes here..."
          :style="{ height: '100%' }"
          :options="{ fontFamily: '黑体', fontSize: '20px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
          @ready="handleReady"
          @change="HandlerCodeChange($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import { ref, shallowRef, defineComponent, } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

import { getCode, saveCode } from "@/utils/request";

export default defineComponent({
  name: "code-compontent",
  components: {
    Codemirror,
  },
  setup() {
    // const code = ref(``);
    const extensions = [javascript()];

    // Codemirror EditorView instance ref
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };

    // Status is available at all times via Codemirror EditorView
    const getCodemirrorStates = () => {
      const state = view.value.state;
      const ranges = state.selection.ranges;
      const selected = ranges.reduce(
        (r, range) => r + range.to - range.from,
        0
      );
      const cursor = ranges[0].anchor;
      const length = state.doc.length;
      const lines = state.doc.lines;
      // more state info ...
      // return ...
    };

    return {
      code: ref(``),
      extensions,
      handleReady,
      log: console.log,
      order: "",
    };
  },
  mounted() {
    // this.httpGetCode()

    //挂载一个操作指令总线，操作指令
    bus.on("handleCodeOption", (order) => {
      console.log(order);
      switch (order) {
        // 改变主题色
        case "changeTheme":
          this.changeTheme();
          break;
        // 获取上次保存的文件内容
        case "getCode":
          this.httpGetCode();
          break;
        // 保存文件
        case "saveCode":
          this.httpSaveCode();
          break;
        // 清空code
        case "delete":
          this.deleteCode();
          break;
        // 复制code
        case "copy":
          this.copyCode();
          break;
      }
    });
  },
  methods: {
    deleteCode() {
      this.code = "";
      this.HandlerCodeChange();
      this.$message.success('文本已清空！');
    },

    copyCode() {
      var inputElement = document.createElement("input");
      // 将 input 元素的样式设置得尽可能小，隐藏元素
      inputElement.style.position = "absolute";
      inputElement.style.left = "-9999px";
      inputElement.style.top = "-9999px";

      document.body.appendChild(inputElement);
      inputElement.value = this.code;

      // 选中文本
      inputElement.select();

      // 复制文本到剪贴板
      document.execCommand("copy");

      document.body.removeChild(inputElement);
      this.$message.success('复制成功！');
    },

    changeTheme() {
      const index = this.extensions.findIndex((extend) => extend == oneDark);
      index === -1 ? this.extensions.push(oneDark) : this.extensions.pop();
    },

    async httpSaveCode() {
      try {
        const res = await saveCode(this.code);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
        }
      } catch (e) {
        this.$message.error("文件保存失败！原因：" + e);
      }
    },

    async httpGetCode() {
      try {
        const res = await getCode();
        if (res.data.code === 200) {
          this.code = res.data.data;
          this.$store.commit("UpdateCode", this.code)
          this.$message.success(res.data.msg);
        }
      } catch (e) {
        this.$message.error("文件打开失败！原因：" + e);
      }
    },

  },
});
</script>

<style scoped lang='scss'>
.ca-code {
  width: 100%;
  // border-right: 2px solid var(--border-bold);
  box-shadow: 0.5rem 0 0.99rem -0.55rem var(--border-bold);
  height: calc(100vh - 6rem);
  overflow: hidden;

  .ca-code-inner_box {
    height: calc(100%);
    display: flex;

    .ca-code-editor {
      width: calc(100%);
      margin-left: 0.5rem;
      height: 100%;
      border: none;
      outline: none;
      font-size: 1rem;
      line-height: 1.5;
      font-family: "黑体";
    }
  }
}
</style>