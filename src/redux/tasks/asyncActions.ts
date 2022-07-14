import { createAsyncThunk } from '@reduxjs/toolkit'
import { TASKS } from 'api'
import { TaskType } from 'api/tasks/types'
import { setError, setIsLoading } from 'redux/app/slice'
import { RejectValueType } from 'redux/store'

type ParamsType = {
	todolistId: string
}

export const getTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, ParamsType, RejectValueType>
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
