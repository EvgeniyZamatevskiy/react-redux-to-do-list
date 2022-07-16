import { createAsyncThunk } from '@reduxjs/toolkit'
import { TODOLISTS } from 'api'
import { TodolistType } from 'api/todolists/types'
import { ResponseCode } from 'enums/ResponseCode'
import { setIsDisabled } from './slice'

export const getTodolists = createAsyncThunk
	<TodolistType[], undefined, { rejectValue: { errors: string[] } }>
	('todolists/getTodolists', async (_, { rejectWithValue }) => {
		try {
			const response = await TODOLISTS.getTodolists()
			const todolists = response.data

			return todolists
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const changeTodolistTitle = createAsyncThunk
	<{ todolistId: string, title: string }, { todolistId: string, title: string }, { rejectValue: { errors: string[] } }>
	('todolists/changeTodolistTitle', async (params, { rejectWithValue }) => {
		try {
			const response = await TODOLISTS.changeTodolistTitle(params.todolistId, params.title)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				return { todolistId: params.todolistId, title: params.title }
			} else {
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const addTodolist = createAsyncThunk
	<TodolistType, string, { rejectValue: { errors: string[] } }>
	('todolists/addTodolist', async (title, { rejectWithValue }) => {
		try {
			const response = await TODOLISTS.addTodolist(title)
			const { resultCode, messages } = response.data
			const todolist = response.data.data.item

			if (resultCode === ResponseCode.SUCCESS) {
				return todolist
			} else {
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const removeTodolist = createAsyncThunk
	<string, string, { rejectValue: { errors: string[] } }>
	('todolists/removeTodolist', async (todolistId, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsDisabled({ todolistId, isDisabled: true }))

			const response = await TODOLISTS.removeTodolist(todolistId)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				return todolistId
			} else {
				dispatch(setIsDisabled({ todolistId, isDisabled: false }))
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			dispatch(setIsDisabled({ todolistId, isDisabled: false }))
			return rejectWithValue({ errors: [error.message] })
		}
	})
