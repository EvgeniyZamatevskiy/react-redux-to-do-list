import { FilterValue } from "enums"
import { DisabledStatusType } from "store/slices/toDoLists/types"

export type TasksFilterPropsType = {
  toDoListId: string
  filter: FilterValue
  disabledStatus: DisabledStatusType
}
