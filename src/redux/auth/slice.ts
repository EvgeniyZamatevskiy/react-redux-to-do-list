import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginTC, logoutTC } from './asyncActions'
import { AuthSliceInitialStateType } from './types'

const initialState: AuthSliceInitialStateType = {
	isAuth: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(loginTC.fulfilled, (state) => {
				state.isAuth = true
			})
			.addCase(logoutTC.fulfilled, (state) => {
				state.isAuth = false
			})
	},
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer
