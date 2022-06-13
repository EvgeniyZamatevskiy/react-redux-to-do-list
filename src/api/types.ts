// todolists
export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}

// tasks
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

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string,
	status?: TaskStatus
	priority?: TaskPriority
	startDate?: string
	deadline?: string
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
// auth
export type LoginParamsType = {
	email: string
	password: string
	rememberMe?: boolean
	captcha?: string
}

export type MeResponseType = {
	id: number
	email: string
	login: string
}

// common
export type CommonResponseType<T = {}> = {
	data: T
	messages: string[]
	fieldsErrors: string[]
	resultCode: number
}