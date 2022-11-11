import { instance } from "api/config"
import { CommonResponseType } from "api/types"
import { TasksResponseType, TaskType, PayloadType } from "./types"

export const TASKS = {
  getTasks(toDoListId: string) {
    return instance.get<TasksResponseType>(`todo-lists/${toDoListId}/tasks`)
  },
  addTask(toDoListId: string, title: string) {
    return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${toDoListId}/tasks`, {title})
  },
  removeTask(toDoListId: string, taskId: string) {
    return instance.delete<CommonResponseType>(`todo-lists/${toDoListId}/tasks/${taskId}`)
  },
  updateTask(toDoListId: string, taskId: string, payload: PayloadType) {
    return instance.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${toDoListId}/tasks/${taskId}`, payload)
  }
}
