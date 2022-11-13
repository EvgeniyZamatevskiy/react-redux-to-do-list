import { FilterValue } from "enums"
import { DisabledStatusType } from "store/slices/toDoLists/types"

export type TasksPropsType = {
  filter: FilterValue
  toDoListId: string
  disabledStatus: DisabledStatusType
}
