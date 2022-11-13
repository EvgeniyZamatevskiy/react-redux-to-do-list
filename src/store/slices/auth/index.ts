import { createSlice } from "@reduxjs/toolkit"
import { getAuthorizedUser, logOut } from "store/asyncActions"
import { AuthSliceInitialStateType } from "./types"

const initialState: AuthSliceInitialStateType = {
  isAuth: false,
  authorizedUser: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.isAuth = false
        state.authorizedUser = null
      })
      .addCase(getAuthorizedUser.fulfilled, (state, action) => {
        state.authorizedUser = action.payload
        state.isAuth = true
      })
  },
})

export default authSlice.reducer
