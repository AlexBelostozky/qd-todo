<template>
  <main class="qdMain">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'QdMain',
  props: {}
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qdMain {
  padding: 32px;
}
</style>
