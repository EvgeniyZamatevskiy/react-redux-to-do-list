import { TaskStatus } from "enums"
import { DisabledStatusType } from "store/slices/toDoLists/types"

export type TaskPropsType = {
  toDoListId: string
  taskId: string
  status: TaskStatus
  title: string
  disabledStatus: DisabledStatusType
}
