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
    setIsDisabled(state, action: PayloadAction<{ toDoListId: string, isDisabled: boolean }>) {
      const toDoList = state.toDoLists.find(toDoList => toDoList.id === action.payload.toDoListId)

      if (toDoList) {
        toDoList.isDisabled = action.payload.isDisabled
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getToDoLists.fulfilled, (state, action) => {
        state.toDoLists = action.payload.map(toDoList => ({...toDoList, filter: FilterValue.ALL, isDisabled: false}))
      })
      .addCase(addToDoList.fulfilled, (state, action) => {
        state.toDoLists.unshift({...action.payload, filter: FilterValue.ALL, isDisabled: false})
      })
      .addCase(removeToDoList.fulfilled, (state, action) => {
        state.toDoLists = state.toDoLists.filter(toDoList => toDoList.id !== action.payload)
      })
      .addCase(changeToDoListTitle.fulfilled, (state, action) => {
        const index = state.toDoLists.findIndex(toDoList => toDoList.id === action.payload.toDoListId)

        if (index > -1) {
          state.toDoLists[index].title = action.payload.title
        }
      })
      .addCase(logOut.fulfilled, (state) => {
        state.toDoLists = []
      })
  },
})

export const {changeToDoListFilter, setIsDisabled} = toDoListsSlice.actions

export default toDoListsSlice.reducer
