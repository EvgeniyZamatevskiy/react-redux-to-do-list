import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterValue } from 'enums/FilterValue'
import { logOut } from 'store/auth/asyncActions'
import { addToDoList, changeToDoListTitle, getToDoLists, removeToDoList } from './asyncActions'
import { ToDoListsSliceInitialStateType } from './types'

const initialState: ToDoListsSliceInitialStateType = {
	toDoLists: []
}

const toDoListsSlice = createSlice({
	name: 'toDoLists',
	initialState,
	reducers: {
		changeToDoListFilter(state, action: PayloadAction<{ toDoListId: string, value: FilterValue }>) {
			const toDoList = state.toDoLists.find(toDoList => toDoList.id === action.payload.toDoListId)
			if (toDoList) {
				toDoList.filter = action.payload.value
			}
		},
		setIsDisabled(state, action: PayloadAction<{ toDoListId: string, isDisabled: boolean }>) {
			const toDoList = state.toDoLists.find(toDoList => toDoList.id === action.payload.toDoListId)
			if (toDoList) {
				toDoList.isDisabled = action.payload.isDisabled
			}
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getToDoLists.fulfilled, (state, action) => {
				state.toDoLists = action.payload.map(toDoList => ({ ...toDoList, filter: FilterValue.ALL, isDisabled: false }))
			})
			.addCase(changeToDoListTitle.fulfilled, (state, action) => {
				const toDoList = state.toDoLists.find(toDoList => toDoList.id === action.payload.toDoListId)
				if (toDoList) {
					toDoList.title = action.payload.title
				}
			})
			.addCase(addToDoList.fulfilled, (state, action) => {
				state.toDoLists.unshift({ ...action.payload, filter: FilterValue.ALL, isDisabled: false })
			})
			.addCase(removeToDoList.fulfilled, (state, action) => {
				state.toDoLists = state.toDoLists.filter(toDoList => toDoList.id !== action.payload)
			})
			.addCase(logOut.fulfilled, (state) => {
				state.toDoLists = []
			})
	},
})

export const { changeToDoListFilter, setIsDisabled } = toDoListsSlice.actions

export default toDoListsSlice.reducer

