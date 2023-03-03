<template>
  <div class="ca-result">
    <div class="ca-result-inner_box">
      <div class="result-title">
        <div class="left-title">
          <span class="title-text">CONSOLE</span>
        </div>
        <div class="right-title"></div>
      </div>
      <div class="result-content">
        <el-card class="box-card" v-if="result">
          <template #header>
            <div class="card-header">
              <span>{{ order ? logDir : "" }}</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div v-for="(item, index) in result" :key="index" class="text item">
            <el-button type="primary" round>{{ item.row }} - {{ item.col }}</el-button>
            <el-button type="success">{{ item.type }}</el-button>
            <el-button>{{ item.value }}</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import { buildLexer } from "@/func";

export default {
  name: "result-compontent",
  data() {
    return {
      order: "",
      result: [],
    };
  },
  computed: {
    logDir() {
      let text = "";
      switch (this.order) {
        case "compiler":
          text = "编译输出结果为：";
          break;
      }
      return text;
    },
  },
  mounted() {
    bus.on("handleOption", (order) => {
      this.order = order;
      this.result = this.makeBuildLexer(this.$store.getters.code);
    });
  },
  methods: {
    makeBuildLexer(content) {
      const tokens = buildLexer(content);
      console.log(tokens);
      return tokens;
    },
  },
};
</script>

<style scoped lang='scss'>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  height: 100%;
}

.ca-result {
  width: 100%;
  height: 100%;
  overflow: scroll;
  border-bottom: 2px solid var(--border-bold);
  position: relative;

  .ca-result-inner_box {
    padding-top: 0.2rem;
    height: 100%;

    .result-title {
      margin-bottom: 0.5rem;
      height: 2rem;
      line-height: 2rem;
      padding-left: 0.5rem;
      box-shadow: 0 0.2rem 0.75rem -0.25rem var(--border-bold);
      color: var(--border-bold);
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>