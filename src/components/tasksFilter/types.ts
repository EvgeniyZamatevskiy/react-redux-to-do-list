import { FilterValueType } from "store/slices/toDoLists/types"

export type TasksFilterPropsType = {
  toDoListId: string
  filter: FilterValueType
  isDisabledToDoList: boolean
}
