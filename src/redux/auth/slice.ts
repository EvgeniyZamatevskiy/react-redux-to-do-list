import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuthorizedUserData, login, logOut } from './asyncActions'
import { AuthSliceInitialStateType } from './types'

const initialState: AuthSliceInitialStateType = {
	isAuth: false,
	authorizedUserData: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {

	},
	extraReducers(builder) {
		builder
			.addCase(logOut.fulfilled, (state, action) => {
				state.isAuth = false
				state.authorizedUserData = null
			})
			.addCase(getAuthorizedUserData.fulfilled, (state, action) => {
				state.authorizedUserData = action.payload
				state.isAuth = true
			})
	},
})

export const { } = authSlice.actions

export default authSlice.reducer
