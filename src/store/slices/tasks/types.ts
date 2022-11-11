import { TaskType } from "api/tasks/types"

export interface TasksSliceInitialStateType {
  tasks: TasksType
}

export type TasksType = {
  [key: string]: TaskType[]
}
