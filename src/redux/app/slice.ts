import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuthorizedUserData } from 'redux/auth/asyncActions'
import { Nullable } from 'types'
import { AppSliceInitialStateType } from './types'
import { errorRejected, isLoadingFulfilled, isLoadingPending, isLoadingRejected } from './utils'

const initialState: AppSliceInitialStateType = {
	isLoading: false,
	error: null,
	isInitialized: false
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setError(state, action: PayloadAction<Nullable<string>>) {
			state.error = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getAuthorizedUserData.fulfilled, (state) => {
				state.isInitialized = true
			})
			.addCase(getAuthorizedUserData.rejected, (state) => {
				state.isInitialized = true
			})
			.addMatcher(isLoadingPending, (state) => {
				state.isLoading = true
			})
			.addMatcher(isLoadingFulfilled, (state) => {
				state.isLoading = false
			})
			.addMatcher(isLoadingRejected, (state) => {
				state.isLoading = false
			})
			.addMatcher(errorRejected, (state, action: PayloadAction<{ errors: string[] }>) => {
				state.error = action.payload.errors[0]
			})
	},
})

export const { setError } = appSlice.actions

export default appSlice.reducer
