import { instance } from './instance'
import { TodolistType, CommonResponseType } from './types'

export const todolistsAPI = {
	getTodolists() {
		return instance.get<TodolistType[]>('todo-lists')
	},
	addTodolist(title: string) {
		return instance.post<CommonResponseType<{ item: TodolistType }>>('todo-lists', { title })
	},
	removeTodolist(id: string) {
		return instance.delete<CommonResponseType>(`todo-lists/${id}`)
	},
	updateTodolist(id: string, title: string) {
		return instance.put<CommonResponseType>(`todo-lists/${id}`, { title })
	}
}
