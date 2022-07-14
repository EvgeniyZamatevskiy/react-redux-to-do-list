import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nullable } from 'types'
import { getItems } from './asyncActions'
import { AppSliceInitialStateType } from './types'

const initialState: AppSliceInitialStateType = {
	isLoading: false,
	error: null
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setError(state, action: PayloadAction<Nullable<string>>) {
			state.error = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getItems.pending, (state, action) => {

			})
	},
})

export const { setIsLoading, setError } = appSlice.actions

export default appSlice.reducer
