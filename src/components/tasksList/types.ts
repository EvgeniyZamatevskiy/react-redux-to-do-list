import { FilterValue } from "enums"
import { TaskType } from "api/tasks/types"

export type TasksListPropsType = {
  tasks: TaskType[]
  filter: FilterValue
  toDoListId: string
  isDisabled: boolean
}
