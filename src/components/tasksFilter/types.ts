import { FilterValueType } from "store/slices/toDoLists/types"
import { TaskSupplementedType } from "store/slices/tasks/types"

export type TasksFilterPropsType = {
  tasks: TaskSupplementedType[]
  toDoListId: string
  filter: FilterValueType
  isDisabledToDoList: boolean
}
