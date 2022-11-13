import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterValue } from "enums"
import { getToDoLists, addToDoList, removeToDoList, changeToDoListTitle, logOut } from "store/asyncActions"
import { DisabledStatusType, ToDoListsSliceInitialStateType } from "./types"

const initialState: ToDoListsSliceInitialStateType = {
  toDoLists: []
}

const toDoListsSlice = createSlice({
  name: "toDoLists",
  initialState,
  reducers: {
    changeToDoListFilter(state, action: PayloadAction<{ toDoListId: string, value: FilterValue }>) {
      const toDoList = state.toDoLists.find(toDoList => toDoList.id === action.payload.toDoListId)

      if (toDoList) {
        toDoList.filter = action.payload.value
      }
    },
    setDisabledStatus(state, action: PayloadAction<{ toDoListId: string, disabledStatus: DisabledStatusType }>) {
      const toDoList = state.toDoLists.find(toDoList => toDoList.id === action.payload.toDoListId)

      if (toDoList) {
        toDoList.disabledStatus = action.payload.disabledStatus
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getToDoLists.fulfilled, (state, action) => {
        state.toDoLists = action.payload.map(toDoList => ({
          ...toDoList,
          filter: FilterValue.ALL,
          disabledStatus: "idle"
        }))
      })
      .addCase(addToDoList.fulfilled, (state, action) => {
        state.toDoLists.unshift({...action.payload, filter: FilterValue.ALL, disabledStatus: "idle"})
      })
      .addCase(removeToDoList.pending, (state, action) => {
        const toDoListId = action.meta.arg
        const toDoList = state.toDoLists.find(({id}) => id === toDoListId)

        if (toDoList) {
          toDoList.disabledStatus = "loading"
        }
      })
      .addCase(removeToDoList.rejected, (state, action) => {
        const toDoListId = action.meta.arg
        const toDoList = state.toDoLists.find(({id}) => id === toDoListId)

        if (toDoList) {
          toDoList.disabledStatus = "failed"
        }
      })
      .addCase(removeToDoList.fulfilled, (state, action) => {
        state.toDoLists = state.toDoLists.filter(toDoList => toDoList.id !== action.payload)
      })
      .addCase(changeToDoListTitle.pending, (state, action) => {
        const toDoListId = action.meta.arg.toDoListId
        const toDoList = state.toDoLists.find(({id}) => id === toDoListId)

        if (toDoList) {
          toDoList.disabledStatus = "loading"
        }
      })
      .addCase(changeToDoListTitle.rejected, (state, action) => {
        const toDoListId = action.meta.arg.toDoListId
        const toDoList = state.toDoLists.find(({id}) => id === toDoListId)

        if (toDoList) {
          toDoList.disabledStatus = "failed"
        }
      })
      .addCase(changeToDoListTitle.fulfilled, (state, action) => {
        const index = state.toDoLists.findIndex(toDoList => toDoList.id === action.payload.toDoListId)

        if (index > -1) {
          state.toDoLists[index].title = action.payload.title
          state.toDoLists[index].disabledStatus = "succeeded"
        }
      })
      .addCase(logOut.fulfilled, (state) => {
        state.toDoLists = []
      })
  },
})

export const {changeToDoListFilter, setDisabledStatus} = toDoListsSlice.actions

export default toDoListsSlice.reducer
