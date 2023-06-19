<template>
  <section class="qdHome">
    <div class="qdHome__content-wrapper">
      <h2>Welcome to Quick Deal ToDo list!</h2>
    
      <p class="qdHome__content-description">Complete your tasks quickly and achieve your goals!</p>
    </div>
    
    <router-link 
        class="qdHome__button" 
        to="/tasks"
      >Go to your Tasks</router-link>
  </section>
</template>

<script>
export default {
  name: 'qdHome',
  components: {
    
  }
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qdHome {
  text-align: center;
}

.qdHome__content-wrapper {
  margin-bottom: 50px;
}

.qdHome__content-description {
  font-weight: 400;
}

.qdHome__button {
  display: block;
  text-decoration: none;
  font-weight: 400;
  color: @white;
  background-color: @blue;
  max-width: 150px;
  margin: auto;
  padding: 10px;
  border-radius: 50px;
  transition: all .2s ease-in-out;

  &:hover,
  &:focus {
    color: @dark-blue;
    background-color: @light-gray;
    outline: none;
  }

  &:active {
    color: @dark-blue;
    background-color: @gray;
  } 
}
</style>