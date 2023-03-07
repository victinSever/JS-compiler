<template>
  <div class="ca-result">
    <div class="ca-result-inner_box">
      <div class="result-title">
        <div class="left-title">
          <span class="title-text">OUTPUT</span>
        </div>
        <div class="right-title"></div>
      </div>

      <div class="result-content">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ logText }}</span>
              <el-button class="button" text>输出流</el-button>
            </div>
          </template>

          <!-- tokens输出 -->
          <div v-if="opration === 'lexical'" class="output-tokens">
            <div class="output-content">
              <div
              v-for="(item, index) in tokens"
              :key="index"
              class="tokens-item"
            >
              <div class="item-in tokens-position">
                <el-button type="primary" round link
                  >{{ item.row }} - {{ item.col }}</el-button
                >
              </div>
              <div class="item-in tokens-type">
                <el-link type="success" :underline="false">{{
                  item.type
                }}</el-link>
              </div>
              <div class="item-in tokens-value">
                <el-button round>{{ item.value }}</el-button>
              </div>
            </div>
            </div>
            <div class="output-line">
              <div class="item-in tokens-position">row-col</div>
              <div class="item-in tokens-type">type</div>
              <div class="item-in tokens-value">value</div>
            </div>
          </div>

          <!-- ast输出 -->
          <div class="output-ast" v-else-if="opration === 'parse'">
            {{ ast }}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "result-compontent",
  props: ['logText', 'opration', 'tokens', 'ast'],
};
</script>

<style scoped lang='scss'>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  height: 100%;
  overflow: scroll;
}

.ca-result {
  width: 100%;
  height: 100%;
  border-bottom: 2px solid var(--border-bold);
  position: relative;
  font-size: 0.9rem;


  .ca-result-inner_box {
    padding-top: 0.2rem;
    height: 100%;

    .result-title {
      margin-bottom: 0.2rem;
      height: 2rem;
      line-height: 2rem;
      padding-left: 0.5rem;
      box-shadow: 0 0.2rem 0.75rem -0.25rem var(--border-bold);
      color: var(--border-bold);
      display: flex;
      justify-content: space-between;
    }

    .result-content {
      height: calc(100% - 3rem);
    }
  }
}

.output-tokens {
  width: 100%;

  .tokens-item {
    width: 100%;
    margin-bottom: 0.5rem;
    display: flex;

    .item-in {
      margin-right: 0.25rem;

      &.tokens-position {
        min-width: 4rem;
      }

      &.tokens-type {
        min-width: 6rem;
      }

      &.tokens-value {
      }
    }
  }

  .output-line {
    position: absolute;
    bottom: 0rem;
    height: 2rem;
    line-height: 2rem;
    width: 100%;
    left: 0;
    box-shadow: 0 0.2rem 0.75rem -0.25rem var(--border-bold);
    background-color: #fff;
    color: var(--theme-warning);
    z-index: 2;
    display: flex;

    .item-in {
      margin-right: 0.25rem;

      &.tokens-position {
        min-width: 4rem;
        margin-left: 1.5rem;
      }

      &.tokens-type {
        min-width: 6rem;
      }
    }
  }
}
</style>