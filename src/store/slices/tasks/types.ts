import { TaskType } from "api/tasks/types"

export type TasksSliceInitialStateType = {
  tasks: TasksType
}

export type TasksType = {
  [key: string]: TaskSupplementedType[]
}


export type TaskSupplementedType = TaskType & {
  isDisabledTask: boolean
}
