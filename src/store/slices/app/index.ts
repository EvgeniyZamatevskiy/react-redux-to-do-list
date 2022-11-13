import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getAuthorizedUser } from "store/asyncActions"
import { AppSliceInitialStateType, LoadingStatusType } from "./types"
import { EMPTY_STRING } from "constants/base"
import { isActionTypeRejected } from "store/helpers"

const initialState: AppSliceInitialStateType = {
  loadingStatus: "idle",
  errorMessage: EMPTY_STRING,
  isInitialized: false
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload
    },
    setLoadingStatus(state, action: PayloadAction<LoadingStatusType>) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAuthorizedUser.fulfilled, (state) => {
        state.isInitialized = true
      })
      .addCase(getAuthorizedUser.rejected, (state) => {
        state.isInitialized = true
      })
      .addMatcher(isActionTypeRejected, (state, action: PayloadAction<{ error: string }>) => {
        state.errorMessage = action.payload.error
      })
  },
})

export const {
  setErrorMessage,
  setLoadingStatus,
} = appSlice.actions

export default appSlice.reducer
