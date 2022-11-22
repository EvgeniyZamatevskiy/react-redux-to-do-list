import { FilterValueType } from "store/slices/toDoLists/types"

export type ButtonFilterPropsType = {
  toDoListId: string
  filterValue: FilterValueType
  filter: FilterValueType
  isDisabledToDoList: boolean
}
