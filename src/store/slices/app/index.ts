import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAuthorizedUserData } from 'store/asyncActions/auth'
import { AppSliceInitialStateType } from './types'
import { EMPTY_STRING } from 'constants/base'
import { isLoadingPending, isErrorRejected, isLoadingFulfilled, isLoadingRejected } from 'store/helpers'

const FIRST_ELEMENT_ARRAY = 0

const initialState: AppSliceInitialStateType = {
	isLoading: false,
	errorMessage: EMPTY_STRING,
	isInitializedApp: false
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setErrorMessage(state, action: PayloadAction<string>) {
			state.errorMessage = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getAuthorizedUserData.fulfilled, (state) => {
				state.isInitializedApp = true
			})
			.addCase(getAuthorizedUserData.rejected, (state) => {
				state.isInitializedApp = true
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
			.addMatcher(isErrorRejected, (state, action: PayloadAction<{ errors: string[] }>) => {
				state.errorMessage = action.payload.errors[FIRST_ELEMENT_ARRAY]
			})
	},
})

export const { setErrorMessage } = appSlice.actions

export default appSlice.reducer
