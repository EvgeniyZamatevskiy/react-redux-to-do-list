import { configureStore } from "@reduxjs/toolkit"
import appSlice from "./slices/app"
import toDoListsSlice from "./slices/toDoLists"
import tasksSlice from "./slices/tasks"
import authSlice from "./slices/auth"

export const store = configureStore({
  reducer: {
    app: appSlice,
    toDoLists: toDoListsSlice,
    tasks: tasksSlice,
    auth: authSlice,
  }
})

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
