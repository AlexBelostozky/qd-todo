<template>
  <header class="qd-header">
    <h1 class="qd-header__title">Quick Deal<br> ToDo list</h1>
    <nav class="qd-header__nav">
      <router-link 
        class="qd-header__nav-link" 
        to="/"
      >Home</router-link>
      
      <router-link 
        class="qd-header__nav-link" 
        to="/tasks"
      >Tasks</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'qdHeader',
  props: {}
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: @blue;
  color: @white;
  padding: 0 32px;
}

.qd-header__title {
  font-size: 24px;
  line-height: 26px;
  text-align: right;
}

.qd-header__nav {
  display: flex;
  height: 100%;
}

.qd-header__nav-link {
  display: block;
  font-weight: 400;
  text-decoration: none;
  color: @white;
  padding: 32px 5px;
  margin-left: 15px;
  transition: all .2s ease-in-out;

  &:hover,
  &:focus {
    background-color: @dark-blue;
    outline: none;
  }

  &:active {
    background-color: @darkest-blue;
  }
}
</style>
