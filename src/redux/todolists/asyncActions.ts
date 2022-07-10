import { createAsyncThunk } from '@reduxjs/toolkit'
import { TODOLISTS } from 'api'
import { TodolistType } from 'api/todolists/types'
import { ResponseCode } from 'enums/ResponseCode'
import { setErrorStatus, setLoadingStatus } from 'redux/app/slice'
import { ThunkError } from 'redux/store'
import { changeTodolistEntityStatus } from './slice'

export const getTodolists = createAsyncThunk<TodolistType[], undefined, ThunkError>
	('todolists/getTodolists', async (params, { dispatch, rejectWithValue }) => {

		dispatch(setLoadingStatus('loading'))

		try {
			const response = await TODOLISTS.getTodolists()
			const { data: todolists } = response

			dispatch(setLoadingStatus('succeeded'))

			return todolists
		} catch (error: any) {
			dispatch(setErrorStatus(error.message ? error.message : 'Some error occurred'))
			dispatch(setLoadingStatus('failed'))
			return rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
		}
	})

export const removeTodolist = createAsyncThunk<string, string, ThunkError>
	('todolists/removeTodolist', async (todolistId, { dispatch, rejectWithValue }) => {

		dispatch(setLoadingStatus('loading'))
		dispatch(changeTodolistEntityStatus({ id: todolistId, status: 'loading' }))

		try {
			const response = await TODOLISTS.removeTodolist(todolistId)
			const { resultCode, messages, fieldsErrors } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setLoadingStatus('succeeded'))
				return todolistId
			} else {
				dispatch(setErrorStatus(messages.length ? messages[0] : 'Some error occurred'))
				dispatch(setLoadingStatus('failed'))
				return rejectWithValue({ errors: messages, fieldsErrors: fieldsErrors })
			}

		} catch (error: any) {
			dispatch(setErrorStatus(error.message ? error.message : 'Some error occurred'))
			dispatch(setLoadingStatus('failed'))
			dispatch(changeTodolistEntityStatus({ id: todolistId, status: 'failed' }))
			return rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
		}
	})

export const addTodolist = createAsyncThunk<TodolistType, string, ThunkError>
	('todolists/addTodolist', async (title, { dispatch, rejectWithValue }) => {

		dispatch(setLoadingStatus('loading'))

		try {
			const response = await TODOLISTS.addTodolist(title)
			const { resultCode, messages, fieldsErrors } = response.data
			const todolist = response.data.data.item

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setLoadingStatus('succeeded'))
				return todolist
			} else {
				dispatch(setErrorStatus(messages.length ? messages[0] : 'Some error occurred'))
				dispatch(setLoadingStatus('failed'))
				return rejectWithValue({ errors: messages, fieldsErrors: fieldsErrors })
			}
		} catch (error: any) {
			dispatch(setErrorStatus(error.message ? error.message : 'Some error occurred'))
			dispatch(setLoadingStatus('failed'))
			return rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
		}
	})

export const changeTodolistTitle = createAsyncThunk
	<{ todolistId: string, newTodolistTitle: string }, { todolistId: string, newTodolistTitle: string }, ThunkError>
	('todolists/changeTodolistTitle', async (params, { dispatch, rejectWithValue }) => {

		dispatch(setLoadingStatus('loading'))

		try {
			const response = await TODOLISTS.updateTodolist(params.todolistId, params.newTodolistTitle)
			const { resultCode, messages, fieldsErrors } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(setLoadingStatus('succeeded'))
				return { todolistId: params.todolistId, newTodolistTitle: params.newTodolistTitle }
			} else {
				dispatch(setErrorStatus(messages.length ? messages[0] : 'Some error occurred'))
				dispatch(setLoadingStatus('failed'))
				return rejectWithValue({ errors: messages, fieldsErrors: fieldsErrors })
			}
		} catch (error: any) {
			dispatch(setErrorStatus(error.message ? error.message : 'Some error occurred'))
			dispatch(setLoadingStatus('failed'))
			return rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
		}
	})
