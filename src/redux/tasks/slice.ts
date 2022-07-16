import { logOut } from 'redux/auth/asyncActions'
import { createSlice } from '@reduxjs/toolkit'
import { addToDoList, getToDoLists, removeToDoList } from 'redux/toDoLists/asyncActions'
import { addTask, getTasks, removeTask, updateTask } from './asyncActions'
import { TasksSliceInitialStateType } from './types'

const initialState: TasksSliceInitialStateType = {
	tasks: {}
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {

	},
	extraReducers(builder) {
		builder
			.addCase(getToDoLists.fulfilled, (state, action) => {
				action.payload.forEach(toDoList => {
					state.tasks[toDoList.id] = []
				})
			})
			.addCase(addToDoList.fulfilled, (state, action) => {
				state.tasks[action.payload.id] = []
			})
			.addCase(removeToDoList.fulfilled, (state, action) => {
				delete state.tasks[action.payload]
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				state.tasks[action.payload.toDoListId] = action.payload.tasks
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks[action.payload.todoListId].unshift(action.payload)
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				state.tasks[action.payload.toDoListId] = state.tasks[action.payload.toDoListId]
					.filter(task => task.id !== action.payload.taskId)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const tasks = state.tasks[action.payload.toDoListId]
				const index = tasks.findIndex(task => task.id === action.payload.taskId)
				if (index > -1) {
					tasks[index] = { ...tasks[index], ...action.payload.domainPayload }
				}
			})
			.addCase(logOut.fulfilled, (state) => {
				state.tasks = {}
			})
	},
})

export const { } = tasksSlice.actions

export default tasksSlice.reducer
