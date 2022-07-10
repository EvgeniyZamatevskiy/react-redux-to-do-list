import { instance } from '../config'
import { CommonResponseType } from '../types'
import { TodolistType } from './types'

export const TODOLISTS = {
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
