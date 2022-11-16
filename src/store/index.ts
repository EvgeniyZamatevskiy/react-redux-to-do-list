import { configureStore } from "@reduxjs/toolkit"
import appSlice from "./slices/app"
import authSlice from "./slices/auth"
import toDoListsSlice from "./slices/toDoLists"
import tasksSlice from "./slices/tasks"

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    toDoLists: toDoListsSlice,
    tasks: tasksSlice,
  }
})

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
