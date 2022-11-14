import { FilterValueType } from "store/slices/toDoLists/types"

export type ToDoListItemPropsType = {
  toDoListId: string
  filter: FilterValueType
  isDisabledToDoList: boolean
  title: string
}
