import { createSlice } from "@reduxjs/toolkit"
import { TasksSliceInitialStateType } from "./types"
import {
  getTasks,
  addTask,
  removeTask,
  updateTask,
  addToDoList,
  getToDoLists,
  removeToDoList,
  logOut,
  changeToDoListTitle
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
      // .addCase(removeToDoList.pending, (state, action) => {
      //   const toDoListId = action.meta.arg
      //   state.tasks[toDoListId] = state.tasks[toDoListId].map(task => ({...task, isDisabledTask: true}))
      // })
      // .addCase(removeToDoList.rejected, (state, action) => {
      //   const toDoListId = action.meta.arg
      //   state.tasks[toDoListId] = state.tasks[toDoListId].map(task => ({...task, isDisabledTask: false}))
      // })
      // .addCase(removeToDoList.fulfilled, (state, action) => {
      //   delete state.tasks[action.payload]
      // })
      // .addCase(changeToDoListTitle.pending, (state, action) => {
      //   const toDoListId = action.meta.arg.toDoListId
      //   state.tasks[toDoListId] = state.tasks[toDoListId].map(task => ({...task, isDisabledTask: true}))
      // })
      // .addCase(changeToDoListTitle.rejected, (state, action) => {
      //   const toDoListId = action.meta.arg.toDoListId
      //   state.tasks[toDoListId] = state.tasks[toDoListId].map(task => ({...task, isDisabledTask: false}))
      // })
      // .addCase(changeToDoListTitle.fulfilled, (state, action) => {
      //   const toDoListId = action.payload.toDoListId
      //   state.tasks[toDoListId] = state.tasks[toDoListId].map(task => ({...task, isDisabledTask: false}))
      // })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks[action.payload.toDoListId] = action.payload.tasks.map(task => ({...task, isDisabledTask: false}))
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks[action.payload.todoListId].unshift({...action.payload, isDisabledTask: false})
      })
      .addCase(removeTask.pending, (state, action) => {
        const toDoListId = action.meta.arg.toDoListId
        const taskId = action.meta.arg.taskId
        const task = state.tasks[toDoListId].find(({id}) => id === taskId)

        if (task) {
          task.isDisabledTask = true
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks[action.payload.toDoListId] = state.tasks[action.payload.toDoListId]
          .filter(task => task.id !== action.payload.taskId)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state.tasks[action.payload.toDoListId]
        const index = tasks.findIndex(task => task.id === action.payload.taskId)

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
