import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTodolists } from 'redux/todolists/asyncActions'
import { getTasks } from './asyncActions'
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
			.addCase(getTasks.fulfilled, (state, action) => {
				state.tasks[action.payload.todolistId] = action.payload.tasks
			})
	},
})

export const { action } = tasksSlice.actions

export default tasksSlice.reducer
