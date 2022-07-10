import { instance } from '../config'
import { CommonResponseType } from '../types'
import { TasksType, TaskType, UpdateTaskModelType } from './types'

export const TASKS = {
	getTasks(todolistId: string) {
		return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`)
	},
	addTask(todolistId: string, title: string) {
		return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
	},
	removeTask(todolistId: string, taskId: string) {
		return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
	}
}
