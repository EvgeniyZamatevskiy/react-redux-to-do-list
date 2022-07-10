import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app/slice'
import authSlice from './auth/slice'
import todolistsSlice from './todolists/slice'
import tasksSlice from './tasks/slice'

export const store = configureStore({
	reducer: {
		app: appSlice,
		auth: authSlice,
		todolists: todolistsSlice,
		tasks: tasksSlice
	}
})

// types
export type RootStateType = ReturnType<typeof store.getState>

export type ThunkError = { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }

export type FieldErrorType = {
	field: string
	error: string
}
