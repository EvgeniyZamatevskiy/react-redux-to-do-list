import { FilterValueType } from "store/slices/toDoLists/types"

export type TasksPropsType = {
  filter: FilterValueType
  toDoListId: string
  isDisabledToDoList: boolean
}
