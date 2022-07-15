import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, changeTodolistTitle, getTodolists, removeTodolist } from './asyncActions'
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
			.addCase(changeTodolistTitle.fulfilled, (state, action) => {
				const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId)
				if (todolist) {
					todolist.title = action.payload.title
				}
			})
			.addCase(addTodolist.fulfilled, (state, action) => {
				state.todolists.unshift({ ...action.payload, filter: 'all', disabledStatus: false })
			})
			.addCase(removeTodolist.fulfilled, (state, action) => {
				state.todolists = state.todolists.filter(todolist => todolist.id !== action.payload)
			})
	},
})

export const { action } = todolistsSlice.actions

export default todolistsSlice.reducer
