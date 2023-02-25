<template>
  <div>
    <Header />
    <div class="ca-content ca-container" ref="container">
      <div
        class="ca-left-box"
        ref="leftBox"
        @mouseup="endResize"
        @mousemove="resize"
      >
        <Code/>
      </div>
      <div
        class="resize-bar"
        @mousedown="startResize"
        @mouseup="endResize"
        @mousemove="resize"
      ></div>
      <div
        class="ca-right-box"
        ref="rightBox"
        @mouseup="endResize"
        @mousemove="resize"
      >
        <Output/>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script>
import Header from "@/components/header";
import Code from "@/components/code";
import Output from "@/components/output";

export default {
  name: "App",
  data() {
    return {
      isResizing: false,
      startX: 0,
      startWidth: 0,
    };
  },
  methods: {
    startResize(e) {
      this.isResizing = true;
      this.startX = e.clientX;
      this.startWidth = this.$refs.leftBox.offsetWidth;
    },
    endResize() {
      this.isResizing = false;
    },
    resize(e) {
      if (this.isResizing) {
        let deltaX = e.clientX - this.startX;
        let leftWidth = this.startWidth + deltaX;
        let rightWidth = this.$refs.container.offsetWidth - leftWidth - 4;
        this.$refs.leftBox.style.width = leftWidth + "px";
        this.$refs.rightBox.style.width = rightWidth + "px";
      }
    },
  },
  components: { Header, Code, Output },
};
</script>

<style lang='scss' scoped>

.ca-content {
  display: flex;
  height: calc(100vh - 6rem - 3px);

  .middle-diviler-line {
    width: 4px;
    height: 100%;
    background-color: #000;
    cursor: ew-resize;
  }
}

.ca-container {
  display: flex;
  width: 100%;

  .resize-bar {
    width: 4px;
    cursor: w-resize;
    position: relative;
  }

  .ca-left-box {
    width: 50vw;
  }

  .ca-right-box {
    width: calc(50vw - 4px);
  }
}
</style>
