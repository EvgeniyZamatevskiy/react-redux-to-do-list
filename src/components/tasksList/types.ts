import { FilterValueType } from "store/slices/toDoLists/types"
import { TaskSupplementedType } from "store/slices/tasks/types"

export type TasksListPropsType = {
  tasks: TaskSupplementedType[]
  isDisabledToDoList: boolean
  filter: FilterValueType
  toDoListId: string
}
