import { instance } from './instance'

export const toDoListsAPI = {
	getToDoLists() {
		return instance.get<ToDolListType[]>('todo-lists')
	}
}

// types
export type ToDolListType = {
	id: string
	title: string
	addedDate: string
	order: number
}