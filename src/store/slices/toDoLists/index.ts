import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterValue } from "enums"
import { getToDoLists, addToDoList, removeToDoList, changeToDoListTitle, logOut } from "store/asyncActions"
import { ToDoListsSliceInitialStateType } from "./types"

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
    // setDisabledStatus(state, action: PayloadAction<{ toDoListId: string, isDisabled: boolean }>) {
    //   const toDoList = state.toDoLists.find(toDoList => toDoList.id === action.payload.toDoListId)
    //
    //   if (toDoList) {
    //     toDoList.isDisabled = action.payload.isDisabled
    //   }
    // }
  },
  extraReducers(builder) {
    builder
      .addCase(getToDoLists.fulfilled, (state, action) => {
        state.toDoLists = action.payload.map(toDoList => ({
          ...toDoList,
          filter: FilterValue.ALL,
          isDisabledToDoList: false
        }))
      })
      .addCase(addToDoList.fulfilled, (state, action) => {
        state.toDoLists.unshift({...action.payload, filter: FilterValue.ALL, isDisabledToDoList: false})
      })
      .addCase(removeToDoList.pending, (state, action) => {
        const toDoListId = action.meta.arg
        const toDoList = state.toDoLists.find(({id}) => id === toDoListId)

        if (toDoList) {
          toDoList.isDisabledToDoList = true
        }
      })
      .addCase(removeToDoList.rejected, (state, action) => {
        const toDoListId = action.meta.arg
        const toDoList = state.toDoLists.find(({id}) => id === toDoListId)

        if (toDoList) {
          toDoList.isDisabledToDoList = false
        }
      })
      .addCase(removeToDoList.fulfilled, (state, action) => {
        state.toDoLists = state.toDoLists.filter(toDoList => toDoList.id !== action.payload)
      })
      .addCase(changeToDoListTitle.pending, (state, action) => {
        const toDoListId = action.meta.arg.toDoListId
        const toDoList = state.toDoLists.find(({id}) => id === toDoListId)

        if (toDoList) {
          toDoList.isDisabledToDoList = true
        }
      })
      .addCase(changeToDoListTitle.rejected, (state, action) => {
        const toDoListId = action.meta.arg.toDoListId
        const toDoList = state.toDoLists.find(({id}) => id === toDoListId)

        if (toDoList) {
          toDoList.isDisabledToDoList = false
        }
      })
      .addCase(changeToDoListTitle.fulfilled, (state, action) => {
        const index = state.toDoLists.findIndex(toDoList => toDoList.id === action.payload.toDoListId)

        if (index > -1) {
          state.toDoLists[index].title = action.payload.title
          state.toDoLists[index].isDisabledToDoList = false
        }
      })
      .addCase(logOut.fulfilled, (state) => {
        state.toDoLists = []
      })
  },
})

export const {changeToDoListFilter} = toDoListsSlice.actions

export default toDoListsSlice.reducer
