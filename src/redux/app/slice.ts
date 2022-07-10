import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from '../../types'
import { initializeAppTC } from './asyncActions'
import { AppSliceInitialStateType, StatusType } from './types'

const initialState: AppSliceInitialStateType = {
	loadingStatus: 'idle',
	error: null,
	isInitialized: false
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setLoadingStatus(state, action: PayloadAction<StatusType>) {
			state.loadingStatus = action.payload
		},
		setErrorStatus(state, action: PayloadAction<Nullable<string>>) {
			state.error = action.payload
		},
		setIsInitialized(state, action: PayloadAction<boolean>) {
			state.isInitialized = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(initializeAppTC.fulfilled, (state) => {
				state.isInitialized = true
			})
	},
})

export const { setLoadingStatus, setErrorStatus, setIsInitialized } = appSlice.actions

export default appSlice.reducer
