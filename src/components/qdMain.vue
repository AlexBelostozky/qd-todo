<template>
  <main class="qdMain">
    <router-view/>
  </main>
</template>

<script>
export default {
  name: 'qdMain',
  props: {}
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qdMain {
  // height: 100%;
  padding: 32px;
}
</style>
