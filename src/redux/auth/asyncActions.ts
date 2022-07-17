import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH } from 'api'
import { AuthorizedUserDataType, LoginParamsType } from 'api/auth/types'
import { ResponseCode } from 'enums/ResponseCode'

export const getAuthorizedUserData = createAsyncThunk
	<AuthorizedUserDataType, undefined, { rejectValue: { errors: string[] } }>
	('auth/getAuthorizedUserData', async (_, { rejectWithValue }) => {
		try {
			const response = await AUTH.me()
			const { data: authorizedUserData, resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				return authorizedUserData
			} else {
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const login = createAsyncThunk
	<void, LoginParamsType, { rejectValue: { errors: string[] } }>
	('auth/login', async (loginParams, { dispatch, rejectWithValue }) => {
		try {
			const response = await AUTH.login(loginParams)
			const { resultCode, messages } = response.data

			if (resultCode === ResponseCode.SUCCESS) {
				dispatch(getAuthorizedUserData())
			} else {
				return rejectWithValue({ errors: messages })
			}
		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})

export const logOut = createAsyncThunk
	<void, undefined, { rejectValue: { errors: string[] } }>
	('auth/logOut', async (_, { rejectWithValue }) => {
		try {
			const response = await AUTH.logOut()
			const { resultCode, messages } = response.data

			if (resultCode !== ResponseCode.SUCCESS) {
				return rejectWithValue({ errors: messages })
			}

		} catch (error: any) {
			return rejectWithValue({ errors: [error.message] })
		}
	})
