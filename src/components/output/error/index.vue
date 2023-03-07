<template>
  <div class="ca-error">
    <div class="ca-error-btns">
      <div class="left-btns">
        <span class="error-text">ERROR</span>
      </div>
      <div class="right-btns">
        <el-icon @click="handleClose"><Close /></el-icon>
      </div>
    </div>
    <div class="ca-error-inner_box">
      <div class="error-item" v-for="(item,i) in error" :key="i">
        <span>{{item.row}}</span>
        <span>{{item.col}}</span>
        <span>{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Close
} from "@element-plus/icons-vue";

export default {
  name: "error-compontent",
  props: ['error'],
  setup() {
    return {
      Close
    };
  },
  methods: {
    handleClose() {
      this.$emit('handleClose', true)
    }
  }
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
    color: var(--border-bold);
    // color: var(--theme-danger);
  }
}
</style>