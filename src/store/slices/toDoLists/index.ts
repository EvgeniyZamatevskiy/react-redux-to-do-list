import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getToDoLists, addToDoList, removeToDoList, updateToDoListTitle, logOut } from "store/asyncActions"
import { FilterValueType, ToDoListsSliceInitialStateType } from "./types"

const initialState: ToDoListsSliceInitialStateType = {
  toDoLists: []
}

const toDoListsSlice = createSlice({
  name: "toDoLists",
  initialState,
  reducers: {
    changeToDoListFilter(state, action: PayloadAction<{ toDoListId: string, value: FilterValueType }>) {
      // const toDoLists = state.toDoLists.find(toDoLists => toDoLists.id === action.payload.toDoListId)
      //
      // if (toDoLists) {
      //   toDoLists.filter = action.payload.value
      // }

      const index = state.toDoLists.findIndex(({id}) => id === action.payload.toDoListId)

      if (index > -1) {
        state.toDoLists[index].filter = action.payload.value
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getToDoLists.fulfilled, (state, action) => {
        state.toDoLists = action.payload.map(toDoList => ({
          ...toDoList,
          filter: "all",
          isDisabledToDoList: false
        }))
      })
      .addCase(addToDoList.fulfilled, (state, action) => {
        state.toDoLists.unshift({...action.payload, filter: "all", isDisabledToDoList: false})
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
        // state.toDoLists = state.toDoLists.filter(toDoLists => toDoLists.id !== action.payload)

        const index = state.toDoLists.findIndex(({id}) => id === action.payload)
        if (index > -1) {
          state.toDoLists.splice(index, 1)
        }
      })
      .addCase(updateToDoListTitle.fulfilled, (state, action) => {
        const index = state.toDoLists.findIndex(toDoList => toDoList.id === action.payload.toDoListId)

        if (index > -1) {
          state.toDoLists[index].title = action.payload.toDoListTitle
        }
      })
      .addCase(logOut.fulfilled, (state) => {
        state.toDoLists = []
      })
  },
})

export const {changeToDoListFilter} = toDoListsSlice.actions

export default toDoListsSlice.reducer
