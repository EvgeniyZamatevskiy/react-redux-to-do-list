import { TaskPriority, TaskStatus } from "enums"

export type TasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: string
}

export type TaskType = {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  addedDate: string
}

export type PayloadType = {
  title: string
  description: string,
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type DomainPayloadType = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}
