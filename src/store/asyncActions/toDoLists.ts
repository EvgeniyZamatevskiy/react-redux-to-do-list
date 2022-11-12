import { createAsyncThunk } from "@reduxjs/toolkit"
import { TODOLISTS } from "api"
import { ToDoListType } from "api/toDoList/types"
import axios, { AxiosError } from "axios"
import { FIRST_ELEMENT_ARRAY } from "constants/base"
import { ResponseCode } from "enums"
import { setIsDisabled } from "store/slices"
import { handleServerNetworkError } from "utils"

export const getToDoLists = createAsyncThunk<ToDoListType[], undefined, { rejectValue: { error: string } }>
("toDoLists/getToDoLists", async (_, {rejectWithValue}) => {
  try {
    const response = await TODOLISTS.getToDoLists()
    const toDoLists = response.data

    return toDoLists
  } catch (error) {
    return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
  }
})

export const changeToDoListTitle = createAsyncThunk<{ toDoListId: string, title: string }, { toDoListId: string, title: string }, { rejectValue: { error: string } }>
("toDoLists/changeToDoListTitle", async (params, {rejectWithValue}) => {
  try {
    const response = await TODOLISTS.changeToDoListTitle(params.toDoListId, params.title)
    const {resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      return {toDoListId: params.toDoListId, title: params.title}
    } else {
      return rejectWithValue({error: messages[FIRST_ELEMENT_ARRAY]})
    }
  } catch (error) {
    return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
  }
})

export const addToDoList = createAsyncThunk<ToDoListType, string, { rejectValue: { error: string } }>
("toDoLists/addToDoList", async (title, {rejectWithValue}) => {
  try {
    const response = await TODOLISTS.addToDoList(title)
    const {resultCode, messages} = response.data
    const toDoList = response.data.data.item

    if (resultCode === ResponseCode.SUCCESS) {
      return toDoList
    } else {
      return rejectWithValue({error: messages[FIRST_ELEMENT_ARRAY]})
    }
  } catch (error) {
    return handleServerNetworkError(error as AxiosError | Error, rejectWithValue)
  }
})

export const removeToDoList = createAsyncThunk<string, string, { rejectValue: { error: string } }>
("toDoLists/removeToDoList", async (toDoListId, {dispatch, rejectWithValue}) => {

  dispatch(setIsDisabled({toDoListId, isDisabled: true}))

  try {
    const response = await TODOLISTS.removeToDoList(toDoListId)
    const {resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      return toDoListId
    } else {
      dispatch(setIsDisabled({toDoListId, isDisabled: false}))
      return rejectWithValue({error: messages[FIRST_ELEMENT_ARRAY]})
    }
  } catch (e) {
    dispatch(setIsDisabled({toDoListId, isDisabled: false}))
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
      const error = err.response?.data
        ? (err.response.data as ({ err: string })).err
        : err.message
      return rejectWithValue({error})
    } else {
      return rejectWithValue({error: "hard"})
    }

  }
})
