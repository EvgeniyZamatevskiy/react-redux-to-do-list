import { instance } from 'api/config'
import { TodolistType } from './types'

export const TODOLISTS = {
	getTodolists() {
		return instance.get<TodolistType[]>('todo-lists')
	}
}
