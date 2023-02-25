<template>
  <div class="ca-code">
    <div class="ca-code-inner_box">
      <div class="ca-code-editor">
        <codemirror
          v-model="code"
          placeholder="Code goes here..."
          :style="{ height: '100%' }"
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
import { throttle } from "@/utils/tools";
import bus from "@/utils";
import { ref, shallowRef, defineComponent } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export default defineComponent({
  name: "code-compontent",
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`console.log('Hello, world!')`);
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
      code,
      extensions,
      handleReady,
      log: console.log,
      order: "",
    };
  },
  mounted() {
    //挂载一个操作指令总线，操作指令
    bus.on("handleCodeOption", (order) => {
      switch (order) {
        // 改变主题色
        case "changeTheme":
          {
            const index = this.extensions.findIndex(
              (extend) => extend == oneDark
            );
            index === -1
              ? this.extensions.push(oneDark)
              : this.extensions.pop();
            console.log(this.extensions);
          }
          break;
      }
    });
  },
  methods: {
    HandlerCodeChange() {
      // 传入全局存储
      this.$store.commit("HandleUpdateCode", this.code);
    },
  },
});
</script>

<style scoped lang='scss'>
.ca-code {
  width: 100%;
  border-right: 2px solid var(--border-bold);
  height: calc(100vh - 6rem);
  overflow: scroll;
  position: relative;

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