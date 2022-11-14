import { FilterValueType } from "store/slices/toDoLists/types"

export type TasksListPropsType = {
  isDisabledToDoList: boolean
  filter: FilterValueType
  toDoListId: string
}
