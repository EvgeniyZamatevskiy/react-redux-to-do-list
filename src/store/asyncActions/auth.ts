import { createAsyncThunk } from "@reduxjs/toolkit"
import { AUTH } from "api"
import { AuthorizedUserType, LoginDataType } from "api/auth/types"
import { FIRST_ELEMENT_ARRAY } from "constants/base"
import { ResponseCode } from "enums"

export const getAuthorizedUser = createAsyncThunk<AuthorizedUserType, undefined, { rejectValue: string }>
("auth/getAuthorizedUser", async (_, {rejectWithValue,}) => {
  try {
    const response = await AUTH.me()
    const {data: authorizedUser, resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      return authorizedUser
    } else {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const login = createAsyncThunk<void, LoginDataType, { rejectValue: string }>
("auth/login", async (loginParams, {dispatch, rejectWithValue}) => {
  try {
    const response = await AUTH.login(loginParams)
    const {resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      dispatch(getAuthorizedUser())
    } else {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const logOut = createAsyncThunk<void, undefined, { rejectValue: string }>
("auth/logOut", async (_, {rejectWithValue}) => {
  try {
    const response = await AUTH.logOut()
    const {resultCode, messages} = response.data

    if (resultCode !== ResponseCode.SUCCESS) {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }

  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})
