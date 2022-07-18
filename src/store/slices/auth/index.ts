import { createSlice } from '@reduxjs/toolkit'
import { getAuthorizedUserData, logOut } from '../../asyncActions/auth'
import { AuthSliceInitialStateType } from './types'

const initialState: AuthSliceInitialStateType = {
	isAuth: false,
	authorizedUserData: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(logOut.fulfilled, (state) => {
				state.isAuth = false
				state.authorizedUserData = null
			})
			.addCase(getAuthorizedUserData.fulfilled, (state, action) => {
				state.authorizedUserData = action.payload
				state.isAuth = true
			})
	},
})

export default authSlice.reducer
