<template>
  <div class="ca-output">
    <div class="ca-container-output" ref="containerOutput">
      <div
        class="ca-left-top-box"
        ref="topBox"
        @mouseup="endResize"
        @mousemove="resize"
      >
        <Result />
      </div>
      <div
        class="resize-bar-inline"
        @mousedown="startResize"
        @mouseup="endResize"
        @mousemove="resize"
      ></div>
      <div
        class="ca-right-bottom-box"
        ref="bottomBox"
        @mouseup="endResize"
        @mousemove="resize"
      >
        <Error />
      </div>
    </div>
  </div>
</template>

<script>
import Error from "./error";
import Result from "./result";
export default {
  name: "output-compontent",
  components: { Error, Result },
  data() {
    return {
      isResizing: false,
      startY: 0,
      startHeight: 0,
    };
  },
  methods: {
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
  height: 100%;

  .resize-bar-inline {
    width: 100%;
    height: 4px;
    cursor: s-resize;
    position: relative;
  }

  .ca-left-top-box {
    width: 100%;
    height: 50vh;
  }

  .ca-right-bottom-box {
    width: 100%;
    height: calc(50vh - 4px - 6rem);
  }
}
</style>