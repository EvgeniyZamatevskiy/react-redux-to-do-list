import { instance } from 'api/config'
import { CommonResponseType } from 'api/types'
import { TodolistType } from './types'

export const TODOLISTS = {
	getTodolists() {
		return instance.get<TodolistType[]>('todo-lists')
	},
	changeTodolistTitle(todolistId: string, title: string) {
		return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, { title })
	},
	addTodolist(title: string) {
		return instance.post<CommonResponseType<{ item: TodolistType }>>('todo-lists', { title })
	},
	removeTodolist(todolistId: string) {
		return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
	}
}
