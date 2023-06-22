<template>
  <form 
      class="qdForm" 
      action="#"
    >
      <label 
        class="visually-hidden" 
        for="new-task"
      >Enter your new task:</label>
      <input 
        class="qdForm__input" 
        type="text" 
        id="new-task" 
        placeholder="Your new task" 
        autocomplete="none"
        v-model="inputTask"
        @focus="onTaskInputFocus"
      >
      
      <button 
        class="qdForm__submit" 
        type="submit"
        @click.prevent="addTask(taskIdAbsolute++)"
      >Add</button>
    </form>
</template>

<script>
export default {
  name: 'qdForm',
  props: {},
  methods: {
    addTask () {
      if (this.inputTask) {
        this.taskList.push({
          id: this.taskId,
          description: this.inputTask,
          descriptionDraft: '',
          isComplete: this.isDone,
          isEditing: this.isEditing
        });
        this.updateLocalStorage();
        this.inputTask = '';
        this.cancelTasksEditing();
      }
    }
  }
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qdForm {
  display: flex;
  justify-content: center;
  align-self: center;
  margin-bottom: 35px;
}

.qdForm__input{
  display: block;
  font-family: "SF-Pro", "Arial", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: @blue;
  border: none;
  border-radius: 50px 0 0 50px;
  margin: 0;
  padding: 10px 15px;
  transition: all .2s ease-in-out;

  &::placeholder {
    font-family: "SF-Pro", "Arial", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: @gray;
  }

  &:hover,
  &:focus {
    background-color: @light-gray;
    outline: none;
  }
}

.qdForm__submit {
  font-family: "SF-Pro", "Arial", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: @white;
  background-color: @blue;
  border: none;
  border-radius: 0 50px 50px 0;
  margin: 0;
  padding: 10px 15px;
  transition: all .2s ease-in-out;
  cursor: pointer;

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
