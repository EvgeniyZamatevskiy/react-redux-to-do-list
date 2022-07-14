import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app/slice'
import todolistsSlice from './todolists/slice'
import tasksSlice from './tasks/slice'

export const store = configureStore({
	reducer: {
		app: appSlice,
		todolists: todolistsSlice,
		tasks: tasksSlice,
	}
})

export type RootStateType = ReturnType<typeof store.getState>

export type RejectValueType = {
	rejectValue: { errors: string[] }
}
