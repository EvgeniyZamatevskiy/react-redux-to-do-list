import { ToDoListType } from "api/toDoLists/types"

export interface ToDoListsSliceInitialStateType {
  toDoLists: ToDoListSupplementedType[]
}

export type ToDoListSupplementedType = ToDoListType & {
  filter: FilterValueType
  isDisabledToDoList: boolean
}

export type FilterValueType = "all" | "active" | "completed"
