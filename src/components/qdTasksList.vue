<template>
  <ul class="qdTasksList">
    <li
      v-for="(task, order) in $store.state.taskList"
      :key="task.taskId"
      class="qdTasksList__task"
    >
      <form
        v-if="task.isEditing"
        class="qdTasksList__task-edit-form"
        action="#"
      >
        <input
          v-model="task.descriptionDraft"
          class="qdTasksList__task-edit-input"
          type="text"
          autofocus
        >

        <button
          class="qdTasksList__task-edit-submit"
          type="submit"
          aria-label="Apply changes"
          @click.prevent="submitEditing(order)"
        />

        <button
          class="qdTasksList__task-edit-reset"
          type="reset"
          aria-label="Cancel changes"
          @click.prevent="resetEditing(order)"
        />
      </form>

      <div
        v-else
        class="qdTasksList__task-control-wrapper"
      >
        <label
          class="qdTasksList__task-control"
        >
          <input
            v-model="task.isComplete"
            type="checkbox"
            class="qdTasksList__task-control-input"
            @change="onTaskCheckboxChange"
          >

          <span class="qdTasksList__task-control-mark" />

          <span
            class="qdTasksList__task-description"
            :class="{ 'qdTasksList__task-description--done': task.isComplete }"
          >{{ task.description }}</span>
        </label>

        <button
          class="qdTasksList__task-edit-button"
          type="button"
          href="#"
          @click="editTask(order)"
        >
          Edit
        </button>

        <button
          class="qdTasksList__task-remove-button"
          type="button"
          href="#"
          @click="removeTask(order)"
        >
          Remove
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'QdTasksList',

  props: {},

  mounted () {
    this.checkLocalStorage()
  },

  methods: {
    checkLocalStorage () {
      this.$store.commit('getDataFromLocalStorage')
    },

    onTaskCheckboxChange () {
      this.updateLocalStorage()
    },

    updateLocalStorage () {
      this.$store.commit('sendDataToLocalStorage')
    },

    removeTask (order) {
      this.$store.state.taskList.splice(order, 1)
      this.updateLocalStorage()
    },

    editTask (order) {
      this.$store.state.taskList[order].isEditing = true

      const otherTasks = this.$store.state.taskList.filter((_, idx) => idx !== order)
      otherTasks.forEach(task => {
        task.isEditing = false
      })

      this.$store.state.taskList[order].descriptionDraft = this.$store.state.taskList[order].description
    },

    submitEditing (order) {
      if (!this.$store.state.taskList[order].descriptionDraft) {
        this.removeTask(order)
      } else {
        this.$store.state.taskList[order].description = this.$store.state.taskList[order].descriptionDraft
      }
      this.cancelTasksEditing()
      this.updateLocalStorage()
    },

    resetEditing (order) {
      this.$store.state.taskList[order].isEditing = false
    },

    cancelTasksEditing () {
      this.$store.state.taskList.forEach(task => {
        task.isEditing = false
      })
    }
  }
}
</script>

<style lang="less">
@import '../assets/globalStyles/styles.less';

.qdTasksList {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}

.qdTasksList__task {
  font-weight: 400;
  min-height: 30px;
  margin-bottom: 12px;

  &:hover .qdTasksList__task-edit-button,
  &:hover .qdTasksList__task-remove-button {
    display: block;
  }
}

.qdTasksList__task-edit-form {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0 0 40px;
}

.qdTasksList__task-edit-input {
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

.qdTasksList__task-edit-submit {
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

.qdTasksList__task-edit-reset {
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

.qdTasksList__task-control-wrapper {
  display: flex;
  align-items: center;
}

.qdTasksList__task-control {
  position: relative;
  margin-right: 10px;
  padding: 5px 0;
  cursor: pointer;

  &:hover .qdTasksList__task-control-mark,
  &:focus .qdTasksList__task-control-mark {
    border-color: @gray;
  }
}

.qdTasksList__task-control-input {
  display: none;

  &:checked + .qdTasksList__task-control-mark {
    background-color: @light-gray;
    border: none;
  }

  &:checked + .qdTasksList__task-control-mark::before {
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

  &:checked + .qdTasksList__task-control-mark::after {
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

.qdTasksList__task-control-mark {
  position: absolute;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border: 1px solid @white;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
}

.qdTasksList__task-description {
  padding-left: 40px;

  &--done {
    color: @light-gray;
    text-decoration: line-through;
  }
}

.qdTasksList__task-edit-button {
  display: none;
  font-size: 16px;
  text-decoration: none;
  color: @dark-gray;
  margin-right: 10px;
  background: transparent;
  border: none;
  transition: all .2s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    color: @gray;
  }

  &:active {
    color: @dark-gray;
  }
}

.qdTasksList__task-remove-button {
  display: none;
  font-size: 16px;
  text-decoration: none;
  color: @dark-red;
  margin-right: 10px;
  background: transparent;
  border: none;
  transition: all .2s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    color: @red;
  }

  &:active {
    color: @dark-red;
  }
}
</style>
