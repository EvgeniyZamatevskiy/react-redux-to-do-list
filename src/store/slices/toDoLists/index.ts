import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getToDoLists, addToDoList, removeToDoList, updateToDoListTitle, logOut } from "store/asyncActions"
import { FilterValueType, ToDoListsSliceInitialStateType, ToDoListSupplementedType } from "./types"
import { EMPTY_STRING } from "constants/base"

const initialState: ToDoListsSliceInitialStateType = {
  toDoLists: [],
  currentToDoList: {} as ToDoListSupplementedType,
  titleSearchValue: EMPTY_STRING
}

const toDoListsSlice = createSlice({
  name: "toDoLists",
  initialState,
  reducers: {
    changeToDoListFilter(state, action: PayloadAction<{ toDoListId: string, filterValue: FilterValueType }>) {
      // const toDoLists = state.toDoLists.find(toDoLists => toDoLists.id === action.payload.toDoListId)
      //
      // if (toDoLists) {
      //   toDoLists.filter = action.payload.value
      // }

      const index = state.toDoLists.findIndex(({id}) => id === action.payload.toDoListId)

      if (index > -1) {
        state.toDoLists[index].filter = action.payload.filterValue
      }
    },
    setTitleSearchValue(state, action: PayloadAction<string>) {
      state.titleSearchValue = action.payload
    },
    setCurrentToDoList(state, action: PayloadAction<ToDoListSupplementedType>) {
      state.currentToDoList = action.payload
    },
    setSortedToDoLists(state, action: PayloadAction<{ toDoListId: string, toDoListOrder: number }>) {
      // state.toDoLists = state.toDoLists.map(t => {
      //   if (t.id === action.payload.toDoListId) {
      //     return {...t, order: state.currentToDoList.order}
      //   }
      //
      //   if (t.id === state.currentToDoList.id) {
      //     return {...t, order: action.payload.toDoListOrder}
      //   }
      //
      //   return t
      // })
      const toDoList = state.toDoLists.find(({id}) => id === action.payload.toDoListId)
      if (toDoList) {
        toDoList.order = state.currentToDoList.order
      }

      const currentToDoList = state.toDoLists.find(({id}) => id === state.currentToDoList.id)
      if (currentToDoList) {
        currentToDoList.order = action.payload.toDoListOrder
      }
    }
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

export const {
  changeToDoListFilter,
  setTitleSearchValue,
  setSortedToDoLists,
  setCurrentToDoList
} = toDoListsSlice.actions

export default toDoListsSlice.reducer
