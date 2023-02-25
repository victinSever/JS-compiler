<template>
  <div class="ca-error">
<div class="ca-error-inner_box">
      <!-- 213 -->
      <!-- <p v-for="p in 100" :key="p" v-text="p"></p> -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'error-compontent'
}
</script>

<style scoped lang='scss'>
.ca-error {
  width: 100%;
  height: 100%;
  overflow: scroll;
  

  .ca-error-inner_box {
    padding: 0.5rem;
    height: 100%;   
  }
}
</style>