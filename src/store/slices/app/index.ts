import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getAuthorizedUser } from "store/asyncActions"
import { AppSliceInitialStateType } from "./types"
import { EMPTY_STRING } from "constants/base"
import { isActionTypeFulfilled, isActionTypePending, isActionTypeRejected } from "store/predicates"

const initialState: AppSliceInitialStateType = {
  loadingStatus: "idle",
  errorMessage: EMPTY_STRING,
  isInitialized: false,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAuthorizedUser.fulfilled, (state) => {
        state.isInitialized = true
      })
      .addCase(getAuthorizedUser.rejected, (state) => {
        state.isInitialized = true
      })
      .addMatcher(isActionTypePending, (state, action: PayloadAction<string>) => {
        state.loadingStatus = "loading"
      })
      .addMatcher(isActionTypeRejected, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload
        state.loadingStatus = "failed"
      })
      .addMatcher(isActionTypeFulfilled, (state, action: PayloadAction<string>) => {
        state.loadingStatus = "succeeded"
      })
  },
})

export const {setErrorMessage} = appSlice.actions

export default appSlice.reducer
