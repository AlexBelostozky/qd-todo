<template>
  <div class="qdTasks">
    <h2 class="qdTasks__heading">
      <span>
        {{
          $store.state.taskList.length === 0
            ? 'Your tasks will be here as soon as you add them'
            : 'Your tasks'
        }}
      </span>
    </h2>

    <qdForm />

    <qdTasksList />
  </div>
</template>

<script>
import qdForm from '../components/qdForm'
import qdTasksList from '../components/qdTasksList'

export default {
  name: 'QdTasks',
  components: {
    qdForm,
    qdTasksList
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
