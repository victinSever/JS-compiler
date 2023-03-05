<template>
  <div>
    <el-drawer v-model="drawer" direction="ltr">
      <template #header>
        <h4>文件夹</h4>
      </template>
      <template #default>
        <el-tree
          :data="data"
          draggable
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :props="{ class: customNodeClass }"
          @node-click="handleNodeClick"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">打开</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { ElMessageBox } from "element-plus";
import { ref } from "vue";

const customNodeClass = (data, node) => {
  if (data.isPenultimate) {
    return "is-penultimate";
  }
  return null;
};

const fileTree = [
  {
    id: 1,
    label: "最近文件",
    isPenultimate: true,
    children: [
      {
        id: 4,
        label: "code.txt",
      },
    ],
  },
  {
    id: 2,
    label: "未命名文件",
    children: [
      {
        id: 5,
        label: "tokens.json",
      },
      {
        id: 6,
        label: "ast.txt",
      },
    ],
  },
];

export default {
  name: "mkdir-compontent",
  props: ["changeDrawer"],
  data() {
    return {
      customNodeClass,
      data: fileTree,
      drawer: ref(false),
      selectFilename: ''
    };
  },
  watch: {
    changeDrawer() {
      this.drawer = !this.drawer;
    },
  },
  methods: {
    handleNodeClick(data) {
        this.selectFilename = data.label
    },
    handleClose: (done) => {
      done()
    },
    cancelClick() {
      this.drawer = false;
    },
    confirmClick() {
      let that = this;
      if(!that.selectFilename) return this.$message.warning("你还未选择文件！")
      ElMessageBox.confirm(`确定选择文件 ${that.selectFilename}?`)
        .then(() => {
          that.drawer = false;
        })
        .catch(() => {
          // catch error
        });
    },
  },
};
</script>

<style scoped lang='scss'>
.is-penultimate > .el-tree-node__content {
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}
.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}
</style>