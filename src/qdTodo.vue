<template>
  <div id="qd-todo">
    <qdHeader />
    <qdMain/>
  </div>
</template>

<script>
import qdHeader from './components/qdHeader.vue'
import qdMain from './components/qdMain.vue'

export default {
  name: 'qdTodo',
  components: {
    qdHeader,
    qdMain
  }
}
</script>

<style>

</style>
