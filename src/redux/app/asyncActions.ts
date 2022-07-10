import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseCode } from 'enums/ResponseCode'
import { setIsAuth } from 'redux/auth/slice'
import { AUTH } from '../../api'
import { serverAppErrorHandler } from '../../utils/error-utils'

export const initializeAppTC = createAsyncThunk('app/initializeAppTC', async (params, { dispatch }) => {
	try {
		const response = await AUTH.me()
		const { resultCode } = response.data

		if (resultCode === ResponseCode.SUCCESS) {
			dispatch(setIsAuth(true))
		} else {
			serverAppErrorHandler(response.data, dispatch)
		}
	} catch (error: any) {
		alert(error.message ? error.message : 'Some error occurred')
	}
})
