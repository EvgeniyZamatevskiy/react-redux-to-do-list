import { createAsyncThunk } from "@reduxjs/toolkit"
import { TASKS } from "api"
import { DomainPayloadType, PayloadType, TaskType } from "api/tasks/types"
import { FIRST_ELEMENT_ARRAY } from "constants/base"
import { ResponseCode } from "enums"
import { RootStateType } from "store"

export const getTasks = createAsyncThunk<{ tasks: TaskType[], toDoListId: string }, string, { rejectValue: string }>
("tasks/getTasks", async (toDoListId, {rejectWithValue}) => {
  try {
    const response = await TASKS.getTasks(toDoListId)
    const tasks = response.data.items

    return {tasks, toDoListId}
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const addTask = createAsyncThunk<TaskType, { toDoListId: string, title: string }, { rejectValue: string }>
("tasks/addTask", async (params, {rejectWithValue}) => {
  try {
    const response = await TASKS.addTask(params.toDoListId, params.title)
    const {resultCode, messages} = response.data
    const task = response.data.data.item

    if (resultCode === ResponseCode.SUCCESS) {
      return task
    } else {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const removeTask = createAsyncThunk<{ toDoListId: string, taskId: string }, { toDoListId: string, taskId: string }, { rejectValue: string }>
("tasks/removeTask", async (params, {rejectWithValue}) => {
  try {
    const response = await TASKS.removeTask(params.toDoListId, params.taskId)
    const {resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      return {toDoListId: params.toDoListId, taskId: params.taskId}
    } else {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const updateTask = createAsyncThunk<{ toDoListId: string, taskId: string, domainPayload: DomainPayloadType },
  { toDoListId: string, taskId: string, domainPayload: DomainPayloadType }, { rejectValue: string, state: RootStateType }>
("tasks/updateTask", async (params, {rejectWithValue, getState}) => {

  const task = getState().tasks.tasks[params.toDoListId].find(({id}) => id === params.taskId)

  if (!task) {
    return rejectWithValue("Task not found in the state!")
  }

  const payload: PayloadType = {
    // deadline: task.deadline,
    // description: task.description,
    // priority: task.priority,
    // startDate: task.startDate,
    // title: task.title,
    // status: task.status,
    ...task,
    ...params.domainPayload
  }
  try {
    const response = await TASKS.updateTask(params.toDoListId, params.taskId, payload)
    const {resultCode, messages} = response.data

    if (resultCode === ResponseCode.SUCCESS) {
      return params
    } else {
      return rejectWithValue(messages[FIRST_ELEMENT_ARRAY])
    }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})
