import { instance } from 'api/config'
import { CommonResponseType } from 'api/types'
import { TasksResponseType, TaskType, PayloadType } from './types'

export const TASKS = {
	getTasks(todolistId: string) {
		return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
	},
	addTask(todolistId: string, title: string) {
		return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
	},
	removeTask(todolistId: string, taskId: string) {
		return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTask(todolistId: string, taskId: string, payload: PayloadType) {
		return instance.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, payload)
	}
}
