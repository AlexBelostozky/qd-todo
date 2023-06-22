<template>
  <div class="qdTasks">
    <h2 class="qdTasks__heading">
      <span
        v-if="this.$store.state.taskList.length !== 0"
      >Your tasks</span>
      <span 
        v-else
      >Your tasks will be here as soon as you add them</span>
    </h2>

    <qdForm />

    <qdTaskList/>
  </div>
</template>

<script>
import qdForm from '../components/qdForm';
import qdTaskList from '../components/qdTaskList';

export default {
  name: 'qdTasks',
  components: {
    qdForm,
    qdTaskList
  }
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qdTasks {
  text-align: center;
}

.qdTasks__heading {
  line-height: 26px;
}
</style>