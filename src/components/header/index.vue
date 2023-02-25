<template>
  <div class="ca-header">
    <DisplayText/>
    <DisplayBtn/>
  </div>
</template>

<script>
import DisplayBtn from './display-btn';
import DisplayText from './display-text';
export default {
    name: "header-compontent",
    components: { DisplayBtn, DisplayText  }
}
</script>

<style lang="scss" scoped>
.ca-header {
    height: 6rem;
    width: 100%;
}
</style>