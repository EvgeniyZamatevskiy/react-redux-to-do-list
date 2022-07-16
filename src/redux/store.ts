import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app/slice'
import todolistsSlice from './todolists/slice'
import tasksSlice from './tasks/slice'
import authSlice from './auth/slice'

export const store = configureStore({
	reducer: {
		app: appSlice,
		todolists: todolistsSlice,
		tasks: tasksSlice,
		auth: authSlice,
	}
})

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
