import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logOut } from 'redux/auth/asyncActions'
import { addTodolist, changeTodolistTitle, getTodolists, removeTodolist } from './asyncActions'
import { FilterValuesType, TodolistsSliceInitialStateType } from './types'

const initialState: TodolistsSliceInitialStateType = {
	todolists: []
}

const todolistsSlice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {
		changeTodolistFilter(state, action: PayloadAction<{ todolistId: string, value: FilterValuesType }>) {
			const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId)
			if (todolist) {
				todolist.filter = action.payload.value
			}
		},
		setIsDisabled(state, action: PayloadAction<{ todolistId: string, isDisabled: boolean }>) {
			const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId)
			if (todolist) {
				todolist.isDisabled = action.payload.isDisabled
			}
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getTodolists.fulfilled, (state, action) => {
				state.todolists = action.payload.map(todolist => ({ ...todolist, filter: 'all', isDisabled: false }))
			})
			.addCase(changeTodolistTitle.fulfilled, (state, action) => {
				const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId)
				if (todolist) {
					todolist.title = action.payload.title
				}
			})
			.addCase(addTodolist.fulfilled, (state, action) => {
				state.todolists.unshift({ ...action.payload, filter: 'all', isDisabled: false })
			})
			.addCase(removeTodolist.fulfilled, (state, action) => {
				state.todolists = state.todolists.filter(todolist => todolist.id !== action.payload)
			})
			.addCase(logOut.fulfilled, (state, action) => {
				state.todolists = []
			})
	},
})

export const { changeTodolistFilter, setIsDisabled } = todolistsSlice.actions

export default todolistsSlice.reducer

