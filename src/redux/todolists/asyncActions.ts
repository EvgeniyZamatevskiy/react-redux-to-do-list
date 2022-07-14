import { createAsyncThunk } from '@reduxjs/toolkit'
import { TODOLISTS } from 'api'
import { TodolistType } from 'api/todolists/types'
import { setError, setIsLoading } from 'redux/app/slice'
import { RejectValueType } from 'redux/store'

export const getTodolists = createAsyncThunk<TodolistType[], undefined, RejectValueType>
	('todolists/getTodolists', async (params, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsLoading(true))

			const response = await TODOLISTS.getTodolists()
			const todolists = response.data

			dispatch(setIsLoading(false))
			return todolists
		} catch (error: any) {
			dispatch(setError(error.message))
			dispatch(setIsLoading(false))
			return rejectWithValue({ errors: [error.message] })
		}
	})
