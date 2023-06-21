<template>
  <div class="qdTasks">
    <h2>Your tasks</h2>
    <form 
    class="qdTasks__form" 
    action="#"
    >
      <label 
        class="visually-hidden" 
        for="new-task"
      >Enter your new task:</label>
      <input 
        class="qdTasks__input" 
        type="text" 
        id="new-task" 
        placeholder="Your new task" 
        autocomplete="none"
        v-model="inputTask"
        @focus="onTaskInputFocus"
      >
      
      <button 
        class="qdTasks__submit" 
        type="submit"
        @click.prevent="addTask(taskIdAbsolute++)"
      >Add</button>
    </form>

    <ul class="qdTasks__task-list">
      <li 
        class="qdTasks__task"
        v-for="(task, order) in taskList" 
        :key="task.taskId"
      >
        <form 
          class="qdTasks__task-edit-form"
          action="#"
          v-if="task.isEditing"
        >
          <input 
            class="qdTasks__task-edit-input"
            type="text"
            autofocus
            v-model="task.description"
          >
          
          <button 
            class="qdTasks__task-edit-submit"  
            type="submit"
            @click.prevent="submitEditing(order)"
          >
            <span class="visually-hidden">Подтвердить изменение</span>
          </button>

          <button 
            class="qdTasks__task-edit-reset" 
            type="reset"
            @click.prevent="resetEditing(order)"
          >
            <span class="visually-hidden">Отменить изменения</span>
          </button>
        </form>

        <div 
          class="qdTasks__task-control-wrapper"
          v-else
        >
          <label 
            class="qdTasks__task-control"
          >
            <input 
              type="checkbox"
              v-model="task.isComplete"
              class="qdTasks__task-control-input"
            >
          
            <span class="qdTasks__task-control-mark"></span>

            <span 
              class="qdTasks__task-description"
              v-bind:class="{ 'qdTasks__task-description--done': task.isComplete }"
            >{{ task.description }}</span>
          </label>

          <a 
            class="qdTasks__task-edit-button"
            href="#"
            @click.prevent="editTask(order)"
          >Edit</a>

          <a
            class="qdTasks__task-remove-button"
            href="#"
            @click.prevent="removeTask(order)"
          >Remove</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'qdTasks',
  components: {},
  data () {
    return {
      inputTask: '',
      taskList: [],
      isDone: false,
      isEditing: false,
      taskIdAbsolute: 0
    }
  },
  methods: {
    onTaskInputFocus () {
      this.cancelTasksEditing();
    },

    addTask () {
      if (this.inputTask) {
        this.taskList.push({
          id: this.taskId,
          description: this.inputTask,
          isComplete: this.isDone,
          isEditing: this.isEditing
        });
        this.inputTask = '';
        this.cancelTasksEditing();
      }
    },

    editTask (order) {
      console.log('Edit ' + order);
      this.taskList[order].isEditing = true;
      let otherTasks = this.taskList.filter((_, idx) => idx !== order);
      otherTasks.forEach(task => {
        task.isEditing = false;
      })
    },

    // submitEditing (order) {

    // },

    // resetEditing (order) {

    // },

    removeTask (order) {
      this.taskList.splice(order, 1);
    },

    cancelTasksEditing () {
      this.taskList.forEach(task => {
        task.isEditing = false;
      });
    }
  }
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qdTasks {
  text-align: center;
}

.qdTasks__form {
  display: flex;
  justify-content: center;
  align-self: center;
  margin-bottom: 35px;
}

.qdTasks__input{
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

.qdTasks__submit {
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

.qdTasks__task-list {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}

.qdTasks__task {
  font-weight: 400;
  min-height: 30px;
  margin-bottom: 12px;

  &:hover .qdTasks__task-edit-button,
  &:hover .qdTasks__task-remove-button {
    display: block;
  }
}

.qdTasks__task-edit-form {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0 0 40px;
}

.qdTasks__task-edit-input {
  font-family: "SF-Pro", "Arial", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: @white;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0 45px 0 0;
  border-bottom: 1px solid @white;

  &:focus,
  &:active {
    outline: none;
  }
}

.qdTasks__task-edit-submit {
  position: relative;
  top: 0;
  right: 40px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &::before {
    position: absolute;
    top: 50%;
    left: 65%;
    transform: translateX(-50%) translateY(-50%) rotateZ(-45deg);
    content: '';
    width: 15px;
    height: 2px;
    background-color: @gray;
  }

  &::after {
    position: absolute;
    top: 62%;
    left: 30%;
    transform: translateX(-50%) translateY(-50%) rotateZ(45deg);
    content: '';
    width: 8px;
    height: 2px;
    background-color: @gray;
  }

  &:hover,
  &:focus {
    &::before,
    &::after {
      background-color: @white;
    }
  }

  &:active {
    &::before,
    &::after{
      background-color: @gray;
    }
  }
}

.qdTasks__task-edit-reset {
  position: relative;
  top: 0;
  right: 40px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) rotateZ(-45deg);
    content: '';
    width: 15px;
    height: 2px;
    background-color: @dark-red;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) rotateZ(45deg);
    content: '';
    width: 15px;
    height: 2px;
    background-color: @dark-red;
  }

  &:hover,
  &:focus {
    &::before,
    &::after {
      background-color: @red;
    }
  }

  &:active {
    &::before,
    &::after{
      background-color: @dark-red;
    }
  }
}

.qdTasks__task-control-wrapper {
  display: flex;
  align-items: center;
}

.qdTasks__task-control {
  position: relative;
  margin-right: 10px;
  padding: 5px 0;
  cursor: pointer;

  &:hover .qdTasks__task-control-mark,
  &:focus .qdTasks__task-control-mark {
    border-color: @gray;
  }
}

.qdTasks__task-control-input {
  display: none;

  &:checked + .qdTasks__task-control-mark {
    background-color: @light-gray;
    border: none;
  }

  &:checked + .qdTasks__task-control-mark::before {
    position: absolute;
    top: 50%;
    left: 34%;
    width: 4px;
    height: 20px;
    content: "";
    background-color: @blue;
    transform: rotateZ(45deg) translateY(-50%) translateX(-50%);
    border-radius: 2px;
  }

  &:checked + .qdTasks__task-control-mark::after {
    position: absolute;
    top: 57%;
    left: 42%;
    width: 4px;
    height: 10px;
    content: "";
    background-color: @blue;
    transform: rotateZ(-45deg) translateY(-50%) translateX(-50%);
    border-radius: 2px;
  }
}

.qdTasks__task-control-mark {
  position: absolute;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border: 1px solid @white;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
}

.qdTasks__task-description {
  padding-left: 40px;

  &--done {
    color: @light-gray;
    text-decoration: line-through;
  }
}

.qdTasks__task-edit-button {
  display: none;
  font-size: 16px;
  text-decoration: none;
  color: @dark-gray;
  margin-right: 10px;
  transition: all .2s ease-in-out;

  &:hover,
  &:focus {
    color: @gray;
  }

  &:active {
    color: @dark-gray;
  }
}

.qdTasks__task-remove-button {
  display: none;
  font-size: 16px;
  text-decoration: none;
  color: @dark-red;
  margin-right: 10px;
  transition: all .2s ease-in-out;

  &:hover,
  &:focus {
    color: @red;
  }

  &:active {
    color: @dark-red;
  }
}
</style>