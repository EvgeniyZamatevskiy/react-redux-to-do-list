import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getAuthorizedUserData } from "store/asyncActions"
import { AppSliceInitialStateType, LoadingStatusType } from "./types"
import { EMPTY_STRING } from "constants/base"
import { isErrorRejected } from "store/helpers"

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
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
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
      // .addMatcher(isLoadingPending, (state) => {
      //   state.loadingStatus = "loading"
      // })
      // .addMatcher(isLoadingFulfilled, (state) => {
      //   state.loadingStatus = "succeeded"
      // })
      // .addMatcher(isLoadingRejected, (state) => {
      //   state.loadingStatus = "failed"
      // })
      .addMatcher(isErrorRejected, (state, action: PayloadAction<{ error: string }>) => {
        state.errorMessage = action.payload.error
      })
  },
})

export const {
  setErrorMessage,
  setLoadingStatus,
  setIsInitialized
} = appSlice.actions

export default appSlice.reducer
