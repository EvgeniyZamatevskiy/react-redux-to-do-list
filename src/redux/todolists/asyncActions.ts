import { createAsyncThunk } from '@reduxjs/toolkit'
import { TODOLISTS } from 'api'
import { TodolistType } from 'api/todolists/types'
import { ResponseCode } from 'enums/ResponseCode'
import { setError, setIsLoading } from 'redux/app/slice'
import { setisDisabled } from './slice'

export const getTodolists = createAsyncThunk
	<TodolistType[], undefined, { rejectValue: { errors: string[] } }>
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

export const changeTodolistTitle = createAsyncThunk
	<{ todolistId: string, title: string }, { todolistId: string, title: string }, { rejectValue: { errors: string[] } }>
	('todolists/changeTodolistTitle', async (params, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsLoading(true))

			const response = await TODOLISTS.changeTodolistTitle(params.todolistId, params.title)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setIsLoading(false))
				return { todolistId: params.todolistId, title: params.title }
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

export const addTodolist = createAsyncThunk
	<TodolistType, string, { rejectValue: { errors: string[] } }>
	('todolists/addTodolist', async (title, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsLoading(true))

			const response = await TODOLISTS.addTodolist(title)
			const { resultCode, messages } = response.data
			const todolist = response.data.data.item

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setIsLoading(false))
				return todolist
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

export const removeTodolist = createAsyncThunk
	<string, string, { rejectValue: { errors: string[] } }>
	('todolists/removeTodolist', async (todolistId, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsLoading(true))
			dispatch(setisDisabled({ todolistId, isDisabled: true }))

			const response = await TODOLISTS.removeTodolist(todolistId)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setIsLoading(false))
				return todolistId
			} else {
				dispatch(setError(messages[0]))
				dispatch(setIsLoading(false))
				dispatch(setisDisabled({ todolistId, isDisabled: false }))
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			dispatch(setError(error.message))
			dispatch(setIsLoading(false))
			dispatch(setisDisabled({ todolistId, isDisabled: false }))
			return rejectWithValue({ errors: [error.message] })
		}
	})