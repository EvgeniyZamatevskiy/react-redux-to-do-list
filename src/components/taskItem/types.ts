import { TaskStatus } from "enums"

export type TaskPropsType = {
  toDoListId: string
  taskId: string
  status: TaskStatus
  title: string
  isDisabledToDoList: boolean
  isDisabledTask: boolean
}
