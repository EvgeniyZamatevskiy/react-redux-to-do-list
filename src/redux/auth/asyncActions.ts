import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginParamsType } from 'api/auth/types'
import { ResponseCode } from 'enums/ResponseCode'
import { setLoadingStatus } from 'redux/app/slice'
import { AUTH } from '../../api'
import { serverAppErrorHandler } from '../../utils/error-utils'

export const loginTC = createAsyncThunk<unknown, LoginParamsType>('auth/loginTC', async (params, { dispatch }) => {
	dispatch(setLoadingStatus('loading'))
	try {
		const response = await AUTH.login(params)
		const { resultCode } = response.data

		if (resultCode === ResponseCode.SUCCESS) {
			dispatch(setLoadingStatus('succeeded'))
		} else {
			serverAppErrorHandler(response.data, dispatch)
		}
	} catch (error: any) {
		alert(error.message ? error.message : 'Some error occurred')
	}
})

export const logoutTC = createAsyncThunk('auth/logoutTC', async (params, { dispatch }) => {
	dispatch(setLoadingStatus('loading'))
	try {
		const response = await AUTH.logout()
		const { resultCode } = response.data

		if (resultCode === ResponseCode.SUCCESS) {
			dispatch(setLoadingStatus('succeeded'))
		} else {
			serverAppErrorHandler(response.data, dispatch)
		}
	} catch (error: any) {
		alert(error.message ? error.message : 'Some error occurred')
	}
})
