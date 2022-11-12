import { createAsyncThunk } from "@reduxjs/toolkit"
import { AUTH } from "api"
import { AuthorizedUserDataType, LoginParamsType } from "api/auth/types"
import { FIRST_ELEMENT_ARRAY } from "constants/base"
import { ResponseCode } from "enums"

export const getAuthorizedUserData = createAsyncThunk<AuthorizedUserDataType, undefined, { rejectValue: { error: string } }>
("auth/getAuthorizedUserData", async (_, {rejectWithValue}) => {
  try {
    const response = await AUTH.me()
    const {data: authorizedUserData, resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      return authorizedUserData
    } else {
      return rejectWithValue({error: messages[FIRST_ELEMENT_ARRAY]})
    }
  } catch (error: any) {
    return rejectWithValue({error: error.message})
  }
})

export const login = createAsyncThunk<void, LoginParamsType, { rejectValue: { error: string } }>
("auth/login", async (loginParams, {dispatch, rejectWithValue}) => {
  try {
    const response = await AUTH.login(loginParams)
    const {resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      dispatch(getAuthorizedUserData())
    } else {
      return rejectWithValue({error: messages[FIRST_ELEMENT_ARRAY]})
    }
  } catch (error: any) {
    return rejectWithValue({error: error.message})
  }
})

export const logOut = createAsyncThunk<void, undefined, { rejectValue: { error: string } }>
("auth/logOut", async (_, {rejectWithValue}) => {
  try {
    const response = await AUTH.logOut()
    const {resultCode, messages} = response.data

    if (resultCode !== ResponseCode.SUCCESS) {
      return rejectWithValue({error: messages[FIRST_ELEMENT_ARRAY]})
    }

  } catch (error: any) {
    return rejectWithValue({error: error.message})
  }
})
