import { ToDoListType } from "api/toDoList/types"
import { FilterValue } from "enums"

export interface ToDoListsSliceInitialStateType {
  toDoLists: ToDoListSupplementedType[]
}

export type ToDoListSupplementedType = ToDoListType & {
  filter: FilterValue
  isDisabled: boolean
}
