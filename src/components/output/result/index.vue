<template>
  <div class="ca-result">
    <div class="ca-result-inner_box">
      <div class="result">
        {{order ? logDir + result : ''}}
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/utils";
export default {
  name: "result-compontent",
  data() {
    return {
      order: "",
      result: ""
    };
  },
  computed: {
    logDir() {
      let text = ''
      switch(this.order) {
        case 'compiler': text = '编译输出结果为：'; break;
        case 'openFile': text = '打开文件成功！'; break;
      }
      return text
    }
  },
  mounted() {
    bus.on("handleOption", (order) => {
      this.order = order;
      this.result = this.$store.getters.code
    });
  },
};
</script>

<style scoped lang='scss'>
.ca-result {
  width: 100%;
  height: 100%;
  overflow: scroll;
  border-bottom: 2px solid var(--border-bold);
  position: relative;

  // &::before{
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 0.5rem;
  //     background-color: #ccc;
  //   }

  //   &::after{
  //     content: '';
  //     position: absolute;
  //     bottom: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 0.5rem;
  //     background-color: #ccc;
  //   }

  .ca-result-inner_box {
    padding: 0.5rem;
    height: 100%;
  }
}
</style>