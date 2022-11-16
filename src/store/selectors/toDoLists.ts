import { RootStateType } from "store"
import { ToDoListSupplementedType } from "store/slices/toDoLists/types"

export const selectToDoLists = (state: RootStateType): ToDoListSupplementedType[] => state.toDoLists.toDoLists

export const selectTitleSearchValue = (state: RootStateType): string => state.toDoLists.titleSearchValue
