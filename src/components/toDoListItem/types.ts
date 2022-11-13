import { FilterValue } from "enums"
import { DisabledStatusType } from "store/slices/toDoLists/types"

export type ToDoListItemPropsType = {
  toDoListId: string,
  filter: FilterValue,
  disabledStatus: DisabledStatusType,
  title: string
}
