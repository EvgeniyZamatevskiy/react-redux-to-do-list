import { createAsyncThunk } from '@reduxjs/toolkit'

export const getItems = createAsyncThunk<any, any>('app/getItems', async (params, thunkAPI) => {
	try {

	} catch (error: any) {
		alert(error.message ? error.message : 'Some error occurred')
	}
})
