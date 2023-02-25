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
  Scissor,
  Star,
  Printer,
  Sunrise,
  FolderOpened,
} from "@element-plus/icons-vue";

import bus from "@/utils";
import { useStore } from "vuex";

const displayBtnsList = [
  {
    type: "file",
    children: [
      { label: "openFile", icon: FolderOpened, order: "openFile" },
      { label: "compiler", icon: Collection, order: "compiler" },
    ],
  },
  {
    type: "check",
    children: [
      { label: "Scissor", icon: Scissor },
      { label: "DocumentCopy", icon: DocumentCopy },
    ],
  },
  {
    type: "other",
    children: [
      { label: "theme", icon: Sunrise, order: 'changeTheme' },
      { label: "printer", icon: Printer },
      { label: "star", icon: Star },
    ],
  },
];

export default {
  name: "display-btn-compontent",
  setup() {
    const store = useStore();
    return {
      displayBtnsList,
      store,
    };
  },

  methods: {
    handlerGetCode() {},

    handleChooseOptions(order) {
      switch(order) {
        case 'compiler': bus.emit("handleOption", order); break;
        case 'openFile': bus.emit("handleOption", order); break;
        case 'changeTheme': bus.emit("handleCodeOption", order); break;
        default: this.$message.error('命令出错了'); break;;
      }
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