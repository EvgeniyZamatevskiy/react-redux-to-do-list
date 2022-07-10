import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatusType } from 'redux/app/types'
import { getTodolists, removeTodolist, addTodolist, changeTodolistTitle } from './asyncActions'
import { FilterValuesType, TodolistsSliceInitialStateType } from './types'

const initialState: TodolistsSliceInitialStateType = []

const todolistsSlice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {
		changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			state[index].filter = action.payload.filter
		},
		changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: StatusType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			state[index].entityStatus = action.payload.status
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getTodolists.fulfilled, (state, action) => {
				return action.payload.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
			})
			.addCase(removeTodolist.fulfilled, (state, action) => {
				const index = state.findIndex(tl => tl.id === action.payload)
				if (index > -1) {
					state.splice(index, 1)
				}
			})
			.addCase(addTodolist.fulfilled, (state, action) => {
				state.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' })
			})
			.addCase(changeTodolistTitle.fulfilled, (state, action) => {
				const index = state.findIndex(tl => tl.id === action.payload.todolistId)
				state[index].title = action.payload.newTodolistTitle
			})
	}
})

export const { changeTodolistFilter, changeTodolistEntityStatus } = todolistsSlice.actions

export default todolistsSlice.reducer
