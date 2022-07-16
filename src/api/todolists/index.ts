import { instance } from 'api/config'
import { CommonResponseType } from 'api/types'
import { ToDoListType } from './types'

export const TODOLISTS = {
	getToDoLists() {
		return instance.get<ToDoListType[]>('todo-lists')
	},
	changeToDoListTitle(toDoListId: string, title: string) {
		return instance.put<CommonResponseType>(`todo-lists/${toDoListId}`, { title })
	},
	addToDoList(title: string) {
		return instance.post<CommonResponseType<{ item: ToDoListType }>>('todo-lists', { title })
	},
	removeToDoList(toDoListId: string) {
		return instance.delete<CommonResponseType>(`todo-lists/${toDoListId}`)
	}
}
