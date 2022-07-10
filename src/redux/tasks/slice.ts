import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TASKS } from 'api'
import { TaskPriority, TaskStatus, TaskType, UpdateTaskModelType } from 'api/tasks/types'
import { setLoadingStatus } from 'redux/app/slice'
import { RootStateType, ThunkError } from 'redux/store'
import { addTodolist, removeTodolist, getTodolists } from 'redux/todolists/asyncActions'

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
	thunkAPI.dispatch(setLoadingStatus('loading'))
	try {
		const res = await TASKS.getTasks(todolistId)
		const tasks = res.data.items
		thunkAPI.dispatch(setLoadingStatus('succeeded'))
		return { tasks, todolistId }
	} catch (error) {
		//@ts-ignore
		return handleAsyncServerNetworkError(error, thunkAPI)
	}
})
export const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>('tasks/removeTask',
	async (param, thunkAPI) => {
		const res = await TASKS.removeTask(param.todolistId, param.taskId)
		return { taskId: param.taskId, todolistId: param.todolistId }
	})
export const addTask = createAsyncThunk<TaskType, { title: string, todolistId: string }, ThunkError>('tasks/addTask',
	async (param, thunkAPI) => {
		thunkAPI.dispatch(setLoadingStatus('loading'))
		try {
			const res = await TASKS.addTask(param.todolistId, param.title)
			if (res.data.resultCode === 0) {
				thunkAPI.dispatch(setLoadingStatus('succeeded'))
				return res.data.data.item
			} else {
				//handleAsyncServerAppError(res.data, thunkAPI, false)
				return thunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
			}
		} catch (err) {
			//@ts-ignore
			return handleAsyncServerNetworkError(err, thunkAPI, false)
		}
	})
export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string },
	thunkAPI) => {
	const state = thunkAPI.getState() as RootStateType

	//@ts-ignore
	const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
	if (!task) {
		return thunkAPI.rejectWithValue('task not found in the state')
	}

	const apiModel: UpdateTaskModelType = {
		deadline: task.deadline,
		description: task.description,
		priority: task.priority,
		startDate: task.startDate,
		title: task.title,
		status: task.status,
		...param.model
	}

	const res = await TASKS.updateTask(param.todolistId, param.taskId, apiModel)
	try {
		if (res.data.resultCode === 0) {
			return param
		} else {
			//return handleAsyncServerAppError(res.data, thunkAPI)
		}
	} catch (error) {
		//@ts-ignore
		return handleAsyncServerNetworkError(error, thunkAPI)
	}
})

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addTodolist.fulfilled, (state, action) => {
				state[action.payload.id] = []
			})
			.addCase(removeTodolist.fulfilled, (state, action) => {
				delete state[action.payload]
			})
			.addCase(getTodolists.fulfilled, (state, action) => {
				action.payload.forEach(tl => {
					state[tl.id] = []
				})
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				const tasks = state[action.payload.todolistId]
				const index = tasks.findIndex(t => t.id === action.payload.taskId)
				if (index > -1) {
					tasks.splice(index, 1)
				}
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state[action.payload.todoListId].unshift(action.payload)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const tasks = state[action.payload.todolistId]
				const index = tasks.findIndex(t => t.id === action.payload.taskId)
				if (index > -1) {
					tasks[index] = { ...tasks[index], ...action.payload.model }
				}
			})
	}
})


// types
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatus
	priority?: TaskPriority
	startDate?: string
	deadline?: string
}
export type TasksStateType = {
	[key: string]: Array<TaskType>
}

export default tasksSlice.reducer
