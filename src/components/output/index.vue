<template>
  <div class="ca-output">
    <div class="ca-container-output" ref="containerOutput">
      <div
        class="ca-left-top-box"
        ref="topBox"
        :style="'height: ' + (!errorOpen ? '100%' : '60%')"
        @mouseup="endResize"
        @mousemove="resize"
        v-if="consoleOpen"
      >
        <Result 
        :opration="opration"
        :tokens="tokens"
        :ast="ast"
        :logText="logText"
        />
      </div>
      <div
        class="resize-bar-inline"
        @mousedown="startResize"
        @mouseup="endResize"
        @mousemove="resize"
        v-if="consoleOpen && errorOpen"
      ></div>
      <div
        class="ca-right-bottom-box"
        :style="'height: ' + (!consoleOpen ? '100%' : 'calc(40% - 4px)')"
        ref="bottomBox"
        @mouseup="endResize"
        @mousemove="resize"
        v-if="errorOpen"
      >
        <Error :error="error" @handleClose="handleClose"/>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import Error from "./error";
import Result from "./result";

import { getSyntax, getLexical } from "@/utils/request";

export default {
  name: "output-compontent",
  components: { Error, Result },
  data() {
    return {
      isResizing: false,
      startY: 0,
      startHeight: 0,
      consoleOpen: true,
      errorOpen: true,
      opration: "",
      logText: "",
      tokens: [],
      ast: "",
      error: []
    };
  },
  mounted() {  
    // 挂载更改视图事件
    bus.on('handlerChangeView', this.changeView)

    // 监听操作
    bus.on("handleOutput", (p) => {
      this.handleCheckRun(p);
      this.opration = p;
    });
  },
  methods: {
    handleClose() {
      this.errorOpen = false
    },

    handleCheckRun(val) {
      switch (val) {
        case "lexical":
          this.logText = "词法分解析Tokens";
          this.httpGetTokens();
          break;
        case "parse":
          this.logText = "语法分析树AST";
          this.httpGetAST();
          break;
      }
    },
    // 词法分析
    async httpGetTokens() {
      const content = this.$store.getters.code;
      if (typeof content === "string" && content.trim() === "")
        return this.$message.warning("代码为空！");
      try {
        const data = await getLexical(content);  
        let {tokens, error} = data.data
        this.tokens = tokens;
        this.error = error;
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 语法分析
    async httpGetAST() {
      if ( this.tokens.length === 0)
        return this.$message.warning("请先进行词法分析！");
      try {
        const data = await getLexical(this.tokens);
        this.ast = data.data.data;
      } catch (e) {
        this.$message.error(e);
      }
    },
    
    // 更改视图事件
    changeView(obj) {
      if(!this.errorOpen && !this.consoleOpen) {
        bus.emit('handlerChangeViewInContent', true)
      }
      switch(obj.type) {
        case 'console': this.consoleOpen = obj.checked;break;
        case 'error': this.errorOpen = obj.checked;break;
      }
      if(!this.errorOpen && !this.consoleOpen) {
        bus.emit('handlerChangeViewInContent', false)
      }
    },

    startResize(e) {
      this.isResizing = true;
      this.startY = e.clientY;
      this.startHeight = this.$refs.topBox.offsetHeight;
    },
    endResize() {
      this.isResizing = false;
    },
    resize(e) {
      if (this.isResizing) {
        let deltaY = e.clientY - this.startY;
        let topHeight = this.startHeight + deltaY;
        let bottomHeight =
          this.$refs.containerOutput.offsetHeight - topHeight - 4;
        this.$refs.topBox.style.height = topHeight + "px";
        this.$refs.bottomBox.style.height = bottomHeight + "px";
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.ca-output {
  width: 100%;
  background-color: var(--bgColor1);
  height: calc(100vh - 6rem - 3px);

  .ca-container-output {
    height: 100%;
  }

  .resize-bar-inline {
    width: 100%;
    height: 4px;
    cursor: s-resize;
    position: relative;
  }

  .ca-left-top-box {
    width: 100%;
    height: 60%;
  }

  .ca-right-bottom-box {
    width: 100%;
    height: calc(40% - 4px);
  }
}
</style>