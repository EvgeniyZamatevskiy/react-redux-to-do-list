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
