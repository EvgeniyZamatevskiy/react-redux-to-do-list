import { createAsyncThunk } from '@reduxjs/toolkit'
import { TODOLISTS } from 'api'
import { ToDoListType } from 'api/toDoLists/types'
import { ResponseCode } from 'enums/ResponseCode'
import { setIsDisabled } from './slice'

export const getToDoLists = createAsyncThunk
	<ToDoListType[], undefined, { rejectValue: { errors: string[] } }>
	('toDoLists/getToDoLists', async (_, { rejectWithValue }) => {
		try {
			const response = await TODOLISTS.getToDoLists()
			const toDoLists = response.data

			return toDoLists
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const changeToDoListTitle = createAsyncThunk
	<{ toDoListId: string, title: string }, { toDoListId: string, title: string }, { rejectValue: { errors: string[] } }>
	('toDoLists/changeToDoListTitle', async (params, { rejectWithValue }) => {
		try {
			const response = await TODOLISTS.changeToDoListTitle(params.toDoListId, params.title)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				return { toDoListId: params.toDoListId, title: params.title }
			} else {
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const addToDoList = createAsyncThunk
	<ToDoListType, string, { rejectValue: { errors: string[] } }>
	('toDoLists/addToDoList', async (title, { rejectWithValue }) => {
		try {
			const response = await TODOLISTS.addToDoList(title)
			const { resultCode, messages } = response.data
			const toDoList = response.data.data.item

			if (resultCode === ResponseCode.SUCCESS) {
				return toDoList
			} else {
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const removeToDoList = createAsyncThunk
	<string, string, { rejectValue: { errors: string[] } }>
	('toDoLists/removeToDoList', async (toDoListId, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setIsDisabled({ toDoListId, isDisabled: true }))

			const response = await TODOLISTS.removeToDoList(toDoListId)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				return toDoListId
			} else {
				dispatch(setIsDisabled({ toDoListId, isDisabled: false }))
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			dispatch(setIsDisabled({ toDoListId, isDisabled: false }))
			return rejectWithValue({ errors: [error.message] })
		}
	})
