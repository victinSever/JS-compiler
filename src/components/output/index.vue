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
        <Result />
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
        <Error />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus';
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
      consoleOpen: true,
      errorOpen: true
    };
  },
  mounted() {  
    // 挂载更改视图事件
    bus.on('handlerChangeView', this.changeView)
  },
  methods: {
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