import { TaskType } from "api/tasks/types"
import { DisabledStatusType } from "store/slices/toDoLists/types"

export type TasksListPropsType = {
  tasks: TaskType[]
  disabledStatus: DisabledStatusType
}
