import { instance } from './instance'

export const tasksAPI = {
	getTasks(toDoListId: string) {
		return instance.get<TasksType>(`todo-lists/${toDoListId}/tasks`)
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

export enum TaskStatus {
	New = 0,
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