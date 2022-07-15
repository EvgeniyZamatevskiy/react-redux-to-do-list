import { createAsyncThunk } from '@reduxjs/toolkit'
import { TASKS } from 'api'
import { DomainPayloadType, PayloadType, TaskType } from 'api/tasks/types'
import { ResponseCode } from 'enums/ResponseCode'
import { setError, setIsLoading } from 'redux/app/slice'
import { RootStateType } from 'redux/store'

export const getTasks = createAsyncThunk
	<{ tasks: TaskType[], todolistId: string }, { todolistId: string }, { rejectValue: { errors: string[] } }>
	('tasks/getTasks', async (params, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsLoading(true))

			const response = await TASKS.getTasks(params.todolistId)
			const tasks = response.data.items

			dispatch(setIsLoading(false))
			return { tasks, todolistId: params.todolistId }
		} catch (error: any) {
			dispatch(setError(error.message))
			dispatch(setIsLoading(false))
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const addTask = createAsyncThunk
	<TaskType, { todolistId: string, title: string }, { rejectValue: { errors: string[] } }>
	('tasks/addTask', async (params, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsLoading(true))

			const response = await TASKS.addTask(params.todolistId, params.title)
			const { resultCode, messages } = response.data
			const task = response.data.data.item

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setIsLoading(false))
				return task
			} else {
				dispatch(setError(messages[0]))
				dispatch(setIsLoading(false))
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			dispatch(setError(error.message))
			dispatch(setIsLoading(false))
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const removeTask = createAsyncThunk
	<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }, { rejectValue: { errors: string[] } }>
	('tasks/removeTask', async (params, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsLoading(true))

			const response = await TASKS.removeTask(params.todolistId, params.taskId)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setIsLoading(false))
				return { todolistId: params.todolistId, taskId: params.taskId }
			} else {
				dispatch(setError(messages[0]))
				dispatch(setIsLoading(false))
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			dispatch(setError(error.message))
			dispatch(setIsLoading(false))
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const updateTask = createAsyncThunk
	<{ todolistId: string, taskId: string, domainPayload: DomainPayloadType },
		{ todolistId: string, taskId: string, domainPayload: DomainPayloadType },
		{ rejectValue: { errors: string[] }, state: RootStateType }
	>
	('tasks/updateTask', async (params, { rejectWithValue, dispatch, getState }) => {
		const task = getState().tasks.tasks[params.todolistId].find(task => task.id === params.taskId)

		if (!task) {
			return rejectWithValue({ errors: ['Task not found in the state!'] })
		}

		const payload: PayloadType = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			title: task.title,
			status: task.status,
			...params.domainPayload
		}
		try {

			dispatch(setIsLoading(true))

			const response = await TASKS.updateTask(params.todolistId, params.taskId, payload)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setIsLoading(false))
				return params
			} else {
				dispatch(setError(messages[0]))
				dispatch(setIsLoading(false))
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			dispatch(setError(error.message))
			dispatch(setIsLoading(false))
			return rejectWithValue({ errors: [error.message] })
		}
	})

// export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string },
// 	thunkAPI) => {
// 	const state = thunkAPI.getState() as RootStateType

// 	//@ts-ignore
// 	const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
// 	if (!task) {
// 		return thunkAPI.rejectWithValue('task not found in the state')
// 	}

// 	const apiModel: UpdateTaskModelType = {
// 		deadline: task.deadline,
// 		description: task.description,
// 		priority: task.priority,
// 		startDate: task.startDate,
// 		title: task.title,
// 		status: task.status,
// 		...param.model
// 	}

// 	const res = await TASKS.updateTask(param.todolistId, param.taskId, apiModel)
// 	try {
// 		if (res.data.resultCode === 0) {
// 			return param
// 		} else {
// 			//return handleAsyncServerAppError(res.data, thunkAPI)
// 		}
// 	} catch (error) {
// 		//@ts-ignore
// 		return handleAsyncServerNetworkError(error, thunkAPI)
// 	}
// })