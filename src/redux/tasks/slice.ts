import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, getTodolists, removeTodolist } from 'redux/todolists/asyncActions'
import { addTask, getTasks, removeTask, updateTask } from './asyncActions'
import { TasksSliceInitialStateType } from './types'

const initialState: TasksSliceInitialStateType = {
	tasks: {}
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		action(state, action: PayloadAction<any>) {

		},
	},
	extraReducers(builder) {
		builder
			.addCase(getTodolists.fulfilled, (state, action) => {
				action.payload.forEach(todolist => {
					state.tasks[todolist.id] = []
				})
			})
			.addCase(addTodolist.fulfilled, (state, action) => {
				state.tasks[action.payload.id] = []
			})
			.addCase(removeTodolist.fulfilled, (state, action) => {
				delete state.tasks[action.payload]
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				state.tasks[action.payload.todolistId] = action.payload.tasks
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks[action.payload.todoListId].unshift(action.payload)
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				state.tasks[action.payload.todolistId] = state.tasks[action.payload.todolistId]
					.filter(task => task.id !== action.payload.taskId)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const tasks = state.tasks[action.payload.todolistId]
				const index = tasks.findIndex(task => task.id === action.payload.taskId)
				if (index > -1) {
					tasks[index] = { ...tasks[index], ...action.payload.domainPayload }
				}
			})
	},
})

export const { action } = tasksSlice.actions

export default tasksSlice.reducer
