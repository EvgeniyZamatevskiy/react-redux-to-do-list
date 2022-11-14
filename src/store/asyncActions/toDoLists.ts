import { createAsyncThunk } from "@reduxjs/toolkit"
import { TODOLISTS } from "api"
import { ToDoListType } from "api/toDoList/types"
import { FIRST_ELEMENT_ARRAY } from "constants/base"
import { ResponseCode } from "enums"

export const getToDoLists = createAsyncThunk<ToDoListType[], undefined, { rejectValue: string }>
("toDoLists/getToDoLists", async (_, {rejectWithValue}) => {
  try {
    const {data: toDoLists} = await TODOLISTS.getToDoLists()

    return toDoLists
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const changeToDoListTitle = createAsyncThunk<{ toDoListId: string, toDoListTitle: string }, { toDoListId: string, toDoListTitle: string }, { rejectValue: string }>
("toDoLists/changeToDoListTitle", async (params, {rejectWithValue}) => {
  try {
    const response = await TODOLISTS.updateToDoListTitle(params.toDoListId, params.toDoListTitle)
    const {resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      return {...params}
    } else {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const addToDoList = createAsyncThunk<ToDoListType, string, { rejectValue: string }>
("toDoLists/addToDoList", async (toDoListTitle, {rejectWithValue}) => {
  try {
    const response = await TODOLISTS.addToDoList(toDoListTitle)
    const {resultCode, messages} = response.data
    const toDoList = response.data.data.item

    if (resultCode === ResponseCode.SUCCESS) {
      return toDoList
    } else {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const removeToDoList = createAsyncThunk<string, string, { rejectValue: string }>
("toDoLists/removeToDoList", async (toDoListId, {rejectWithValue}) => {
  try {
    const response = await TODOLISTS.removeToDoList(toDoListId)
    const {resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      return toDoListId
    } else {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})
