<template>
  <el-row class="mb-4 ca-display">
    <div
      v-for="(item, index) in displayList"
      :key="index"
      class="ca-display-item"
    >
      <el-popover
        v-if="item.children"
        placement="bottom-start"
        :width="100"
        trigger="click"
      >
        <template #reference>
          <el-button class="m-2" link>{{
            item.label + "(" + item.letter + ")"
          }}</el-button>
        </template>

        <!-- 子菜单 -->
        <div class="ca-display-submenu">
          <div
            class="ca-display-sub-item"
            v-for="(child, p) in item.children"
            :key="p"
             @click="handleOpration(child)"
          >
            <el-button class="m-2 child" link>{{
              child.label + (child.letter ? "(" + child.letter + ")" : "")
            }}</el-button>
            <el-button size="small" circle v-if="child.checked" :icon="Check">
            </el-button>
          </div>
        </div>
      </el-popover>

      <el-button class="m-2" link v-else @click="handleOpration(item)">{{
        item.label + "(" + item.letter + ")"
      }}</el-button>
    </div>
  </el-row>
</template>

<script>
import { Check } from "@element-plus/icons-vue";
import { reactive } from 'vue'
import bus from '@/utils/bus';

const displayList = [
  { label: "文件", letter: "F" },
  { label: "编辑", letter: "E" },
  { label: "词法分析", letter: "W" },
  { label: "语法分析", letter: "P" },
  { label: "中间代码", letter: "M" },
  { label: "目标代码生成", letter: "O" },
  {
    label: "视图",
    letter: "V",
    children: [
      { label: "输出窗口", order: 'console', checked: true },
      { label: "报错窗口", order: 'error', checked: true },
    ],
  },
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
      displayList: reactive(displayList),
      Check,
    };
  },
  methods: {
    handleOpration(obj) {
      console.log(obj);
      if (obj.letter) {
        switch (obj.letter) {
          case "A":
            this.$router.push("/document");
            return;
          default:
            this.$message.warning("功能未完善！");
        }
      } else {
        // 触发主体视图更新变化
        bus.emit('handlerChangeView', {
          type: obj.order,
          checked: !obj.checked
        })

        // 更改按钮的选择状态
        this.displayList.forEach((item, i) => {
          if (item.children) {
            let index = item.children.findIndex((p) => p.label === obj.label);
            if (index !== -1) {             
              this.displayList[i].children[index].checked =
                !this.displayList[i].children[index].checked;
            }
          }
        });       
      }
    },
    handlerChangeViewState() {},
  },
};
</script>

<style lang="scss" scoped>
.ca-display-sub-item {
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  height: 1.5rem;
  cursor: pointer;

  .is-circle:hover {
    background-color: #fff;
  }

  &:hover {
    border-bottom: 1px solid var(--theme-light);
    border-top: 1px solid var(--theme-light);
  }
}

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