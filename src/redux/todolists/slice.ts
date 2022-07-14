import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTodolists } from './asyncActions'
import { TodolistsSliceInitialStateType } from './types'

const initialState: TodolistsSliceInitialStateType = {
	todolists: []
}

const todolistsSlice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {
		action(state, action: PayloadAction<any>) {

		},
	},
	extraReducers(builder) {
		builder
			.addCase(getTodolists.fulfilled, (state, action) => {
				state.todolists = action.payload.map(todolist => ({ ...todolist, filter: 'all', disabledStatus: false }))
			})
	},
})

export const { action } = todolistsSlice.actions

export default todolistsSlice.reducer
