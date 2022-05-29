import { instance } from './instance'
import { CommonResponseType } from './toDoListsAPI'

export const tasksAPI = {
	getTasks(toDoListId: string) {
		return instance.get<TasksType>(`todo-lists/${toDoListId}/tasks`)
	},
	addTask(toDoListId: string, title: string) {
		return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${toDoListId}/tasks`, { title })
	},
	removeTask(toDoListId: string, taskId: string) {
		return instance.delete<CommonResponseType>(`todo-lists/${toDoListId}/tasks/${taskId}`)
	},
	updateTask(toDoListId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${toDoListId}/tasks/${taskId}`, model)
	}
}

// types
export type TasksType = {
	items: TaskType[]
	totalCount: number
	error: null | string
}

export type TaskType = {
	id: string
	title: string
	description: string,
	todoListId: string,
	order: number
	status: TaskStatus
	priority: TaskPriority
	startDate: string
	deadline: string
	addedDate: string
}

export type UpdateTaskModelType = {
	title: string
	description: string,
	status: TaskStatus
	priority: TaskPriority
	startDate: string
	deadline: string
}

export enum TaskStatus {
	Active = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriority {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}