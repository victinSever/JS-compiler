<template>
  <el-row class="mb-4 ca-display">
    <div v-for="(item, index) in displayList" :key="index">
      <el-popover
        v-if="item.children"
        placement="bottom-start"
        :width="200"
        trigger="click"
      >
        <template #reference>
          <el-button class="m-2" link>{{
            item.label + "(" + item.letter + ")"
          }}</el-button>
        </template>

        <div class="ca-display-submenu">
          <el-button
            class="m-2 child"
            link
            v-for="(child, p) in item.children"
            :key="p"
            @click="handleOpration(child.letter)"
            >{{ child.label + "(" + child.letter + ")" }}</el-button
          >
        </div>
      </el-popover>

      <el-button class="m-2" link v-else @click="handleOpration(item.letter)">{{
        item.label + "(" + item.letter + ")"
      }}</el-button>
    </div>
  </el-row>
</template>

<script>
const displayList = [
  { label: "文件", letter: "F" },
  { label: "编辑", letter: "E" },
  { label: "词法分析", letter: "W" },
  { label: "语法分析", letter: "P" },
  { label: "中间代码", letter: "M" },
  { label: "目标代码生成", letter: "O" },
  { label: "查看", letter: "V" },
  {
    label: "帮助",
    letter: "H",
    children: [
      { label: "关于", letter: "A" },
      { label: "更多", letter: "M" },
    ],
  },
];

export default {
  name: "display-compontent",
  setup() {
    return {
      displayList,
    };
  },
  methods: {
    handleOpration(type) {
      console.log(type);
      switch (type) {
        case "A":
          this.$router.push('/document')
          return;
        default:
          this.$message.warning("功能未完善！");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ca-display {
  height: 50%;
  width: 100%;
  background-color: var(--bgColor);
  display: flex;
  align-items: center;

  .el-button {
    margin: 0 0.5rem;
  }

  .el-button:hover {
    background-color: skyblue;
    color: #fff;
  }

  .ca-display-submenu {
    display: flex;
    flex-direction: column;
  }
}
</style>