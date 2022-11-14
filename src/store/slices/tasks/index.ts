import { createSlice } from "@reduxjs/toolkit"
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

const initialState: TasksSliceInitialStateType = {
  tasks: {}
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getToDoLists.fulfilled, (state, action) => {
        action.payload.forEach(toDoList => {
          state.tasks[toDoList.id] = []
        })
      })
      .addCase(addToDoList.fulfilled, (state, action) => {
        state.tasks[action.payload.id] = []
      })
      .addCase(removeToDoList.fulfilled, (state, action) => {
        // delete state.tasks[action.payload]
        const {[action.payload]: [], ...restTasks} = state.tasks
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

export default tasksSlice.reducer
