import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TasksSliceInitialStateType } from "./types"
import {
  getTasks,
  addTask,
  removeTask,
  updateTask,
  addToDoList,
  getToDoLists,
  logOut, removeToDoList,
} from "store/asyncActions"
import { TaskStatus } from "enums"

const initialState: TasksSliceInitialStateType = {
  tasks: {}
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearCompletedTasks(state, action: PayloadAction<string>) {
      const toDoListId = action.payload
      const tasks = state.tasks[toDoListId]
      // state.tasks[toDoListId] = tasks.map(task => task.status === TaskStatus.COMPLETED
      //   ? {...task, status: TaskStatus.NEW}
      //   : task)

      // tasks.forEach(task => {
      //   if (task.status === TaskStatus.COMPLETED) {
      //     task.status = TaskStatus.NEW
      //   }
      // })

      state.tasks[toDoListId] = tasks.filter(({status}) => status !== TaskStatus.COMPLETED)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getToDoLists.fulfilled, (state, action) => {
        const toDoLists = action.payload

        toDoLists.forEach(toDoList => {
          state.tasks[toDoList.id] = []
        })
      })
      .addCase(addToDoList.fulfilled, (state, action) => {
        const toDoList = action.payload

        state.tasks[toDoList.id] = []
      })
      .addCase(removeToDoList.fulfilled, (state, action) => {
        const toDoListId = action.payload
        // delete state.tasks[toDoListId]
        const {[toDoListId]: [], ...restTasks} = state.tasks
        state.tasks = restTasks
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks[action.payload.toDoListId] = action.payload.tasks.map(task => ({...task, isDisabledTask: false}))
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks[action.payload.todoListId].unshift({...action.payload, isDisabledTask: false})
      })
      .addCase(removeTask.pending, (state, action) => {
        const {toDoListId, taskId} = action.meta.arg
        const task = state.tasks[toDoListId].find(({id}) => id === taskId)

        if (task) {
          task.isDisabledTask = true
        }
      })
      .addCase(removeTask.rejected, (state, action) => {
        const {toDoListId, taskId} = action.meta.arg
        const task = state.tasks[toDoListId].find(({id}) => id === taskId)

        if (task) {
          task.isDisabledTask = false
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        // state.tasks[action.payload.toDoListId] = state.tasks[action.payload.toDoListId]
        //   .filter(task => task.id !== action.payload.taskId)

        const tasks = state.tasks[action.payload.toDoListId]
        const index = tasks.findIndex(({id}) => id === action.payload.taskId)

        if (index > -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state.tasks[action.payload.toDoListId]
        const index = tasks.findIndex(({id}) => id === action.payload.taskId)

        if (index > -1) {
          tasks[index] = {...tasks[index], ...action.payload.domainPayload}
        }
      })
      .addCase(logOut.fulfilled, (state) => {
        state.tasks = {}
      })
  },
})

export const {clearCompletedTasks} = tasksSlice.actions

export default tasksSlice.reducer
