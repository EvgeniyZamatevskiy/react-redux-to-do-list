import { instance } from './instance'

export const toDoListsAPI = {
	getToDoLists() {
		return instance.get<ToDolListType[]>('todo-lists')
	},
	addToDoList(title: string) {
		return instance.post<CommonResponseType<{ item: ToDolListType }>>('todo-lists', { title })
	},
	removeToDoList(id: string) {
		return instance.delete<CommonResponseType>(`todo-lists/${id}`)
	},
	updateToDoList(id: string, title: string) {
		return instance.put<CommonResponseType>(`todo-lists/${id}`, { title })
	}
}

// types
export type ToDolListType = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type CommonResponseType<T = {}> = {
	data: T
	messages: string[]
	fieldsErrors: string[]
	resultCode: number
}