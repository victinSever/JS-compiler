<template>
  <el-row class="mb-4 ca-display-btn">
    <div
      class="ca-display-box"
      v-for="(item, index) in displayBtnsList"
      :key="index"
    >
      <div class="ca-display-inner_box">
        <div
          class="ca-display-icon"
          v-for="(child, child_index) in item.children"
          :key="child_index"
        >
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="child.label"
            placement="bottom-start"
          >
            <el-link
              :icon="child.icon"
              :underline="false"
              @click="handleChooseOptions(child.order)"
            ></el-link>
          </el-tooltip>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
import {
  Collection,
  DocumentCopy,
  Delete,
  Star,
  Printer,
  Sunrise,
  FolderOpened,
} from "@element-plus/icons-vue";

import bus from "@/utils/bus";

const displayBtnsList = [
  {
    type: "file",
    children: [
      { label: "打开文件", icon: FolderOpened, order: "getCode" },
      { label: "保存", icon: Collection, order: "saveCode" },
    ],
  },
  {
    type: "check",
    children: [
      { label: "清空", icon: Delete, order: "delete" },
      { label: "全部复制", icon: DocumentCopy, order: "copy" },
    ],
  },
  {
    type: "other",
    children: [
      { label: "切换主题", icon: Sunrise, order: "changeTheme" },
      { label: "编译", icon: Printer, order: "compiler" },
      { label: "收藏", icon: Star },
    ],
  },
];

export default {
  name: "display-btn-compontent",
  setup() {
    return {
      displayBtnsList,
    };
  },

  methods: {
    // 根据业务不同，使用bus触发事件
    handleChooseOptions(order) {
      // console区的操作事件
      const consoleOpration = [];
      // code区的操作事件
      const codeOpration = [
        "changeTheme",
        "saveCode",
        "getCode",
        "delete",
        "copy",
      ];

      // 判断操作
      if (consoleOpration.findIndex((item) => item === order) !== -1) {
        bus.emit("handleOutput", order);
      } else if (codeOpration.findIndex((item) => item === order) !== -1) {
        bus.emit("handleCodeOption", order);
      } else this.$message.info("暂无实现！！");
    },
  },
};
</script>

<style lang="scss" scoped>
.ca-display-btn {
  height: 50%;
  width: 100%;
  background-color: var(--bgColor1);
  display: flex;
  align-items: center;
  border-top: 1px solid var(--border-default);
  border-bottom: 2px solid var(--border-bold);
  padding-left: 0.5rem;

  .ca-display-box {
    display: flex;
    height: 100%;
    align-items: center;

    .ca-display-inner_box {
      display: flex;
      height: 80%;
      align-items: center;
      border-right: 1px solid var(--border-default);

      &:first-child {
        border-left: 2px solid var(--border-default);
      }
    }
  }

  .ca-display-icon {
    margin: 0 1rem;

    .el-link::v-deep .el-icon {
      font-size: 1.2rem;
    }
  }
}
</style>