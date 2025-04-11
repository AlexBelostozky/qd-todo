<template>
  <qdHeader />

  <main class="main">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import qdHeader from '@/components/qdHeader.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    qdHeader
  }
})
</script>

<style lang="less">
.main {
  padding: 32px;
}
</style>
