<template>
  <div class="ca-error">
    <div class="ca-error-btns">
      <div class="left-btns">
        <span class="error-text">ERROR</span>
      </div>
      <div class="right-btns">
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="ca-error-inner_box">
      {{error}}
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import bus from "@/utils/bus";
import {
  Close
} from "@element-plus/icons-vue";

export default {
  name: "error-compontent",
  setup() {
    return {
      error: ref(``),
      Close
    };
  },
  mounted() {
    bus.on("handlePrintError", (error) => {
      this.error = error;
    });
  },
};
</script>

<style scoped lang='scss'>
.ca-error {
  width: 100%;
  height: 100%;

  .ca-error-btns {   
      height: 2rem;
      line-height: 2rem;
      padding-left: 0.5rem;
      box-shadow: 0 0.2rem 0.75rem -0.25rem var(--border-bold);
      color: var(--border-bold);
      display: flex;
      justify-content: space-between;

    .el-icon {
      cursor: pointer;
      margin: 0 0.5rem;
    }
  }

  .ca-error-inner_box {
    overflow: scroll;
    padding: 0.5rem;
    height: calc(100% - 3rem);
  }
}
</style>