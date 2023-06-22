<template>
  <ul class="qdTaskList">
    <li 
      class="qdTaskList__task"
      v-for="(task, order) in $store.state.taskList" 
      :key="task.taskId"
    >
      <form 
        class="qdTaskList__task-edit-form"
        action="#"
        v-if="task.isEditing"
      >
        <input 
          class="qdTaskList__task-edit-input"
          type="text"
          autofocus
          v-model="task.descriptionDraft"
        >
        
        <button 
          class="qdTaskList__task-edit-submit"  
          type="submit"
          @click.prevent="submitEditing(order)"
        >
          <span class="visually-hidden">Подтвердить изменение</span>
        </button>

        <button 
          class="qdTaskList__task-edit-reset" 
          type="reset"
          @click.prevent="resetEditing(order)"
        >
          <span class="visually-hidden">Отменить изменения</span>
        </button>
      </form>

      <div 
        class="qdTaskList__task-control-wrapper"
        v-else
      >
        <label 
          class="qdTaskList__task-control"
        >
          <input 
            type="checkbox"
            v-model="task.isComplete"
            class="qdTaskList__task-control-input"
            @change="onTaskCheckboxChange"
          >
          
          <span class="qdTaskList__task-control-mark"></span>

          <span 
            class="qdTaskList__task-description"
            v-bind:class="{ 'qdTasks__task-description--done': task.isComplete }"
          >{{ task.description }}</span>
        </label>

        <a 
          class="qdTaskList__task-edit-button"
          href="#"
          @click.prevent="editTask(order)"
        >Edit</a>

        <a
          class="qdTaskList__task-remove-button"
          href="#"
          @click.prevent="removeTask(order)"
        >Remove</a>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'qdTaskList',
  props: {},
  // data () {
    
  // },

  mounted () {
    this.checkLocalStorage();
  },

  methods: {
    checkLocalStorage () {
      this.$store.commit('getDataFromLocalStorage');
    },

    onTaskCheckboxChange () {
      this.updateLocalStorage();
    },

    updateLocalStorage () {
      this.$store.commit('sendDataToLocalStorage');
    },

    removeTask (order) {
      this.$store.state.taskList.splice(order, 1);
      this.updateLocalStorage();
    },

    editTask (order) {
      this.$store.state.taskList[order].isEditing = true;

      let otherTasks = this.$store.state.taskList.filter((_, idx) => idx !== order);
      otherTasks.forEach(task => {
        task.isEditing = false;
      })

      this.$store.state.taskList[order].descriptionDraft = this.$store.state.taskList[order].description;
    },

    submitEditing (order) {
      if (!this.$store.state.taskList[order].descriptionDraft) {
        this.removeTask(order);
      } else {
        this.$store.state.taskList[order].description = this.$store.state.taskList[order].descriptionDraft;
      }
      this.cancelTasksEditing();
      this.updateLocalStorage();
    },

    resetEditing (order) {
      this.$store.state.taskList[order].isEditing = false;
    },

    cancelTasksEditing () {
      this.$store.state.taskList.forEach(task => {
        task.isEditing = false;
      });
    },
  }
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qdTaskList {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}

.qdTaskList__task {
  font-weight: 400;
  min-height: 30px;
  margin-bottom: 12px;

  &:hover .qdTaskList__task-edit-button,
  &:hover .qdTaskList__task-remove-button {
    display: block;
  }
}

.qdTaskList__task-edit-form {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0 0 40px;
}

.qdTaskList__task-edit-input {
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

.qdTaskList__task-edit-submit {
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

.qdTaskList__task-edit-reset {
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

.qdTaskList__task-control-wrapper {
  display: flex;
  align-items: center;
}

.qdTaskList__task-control {
  position: relative;
  margin-right: 10px;
  padding: 5px 0;
  cursor: pointer;

  &:hover .qdTaskList__task-control-mark,
  &:focus .qdTaskList__task-control-mark {
    border-color: @gray;
  }
}

.qdTaskList__task-control-input {
  display: none;

  &:checked + .qdTaskList__task-control-mark {
    background-color: @light-gray;
    border: none;
  }

  &:checked + .qdTaskList__task-control-mark::before {
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

  &:checked + .qdTaskList__task-control-mark::after {
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

.qdTaskList__task-control-mark {
  position: absolute;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border: 1px solid @white;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
}

.qdTaskList__task-description {
  padding-left: 40px;

  &--done {
    color: @light-gray;
    text-decoration: line-through;
  }
}

.qdTaskList__task-edit-button {
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

.qdTaskList__task-remove-button {
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
