import { TaskSupplementedType } from "store/slices/tasks/types"

export type TasksListPropsType = {
  tasks: TaskSupplementedType[]
  isDisabledToDoList: boolean
  activeTasks: number
}
