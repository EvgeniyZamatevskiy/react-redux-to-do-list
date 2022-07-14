import { instance } from 'api/config'
import { TasksResponseType } from './types'

export const TASKS = {
	getTasks(todolistId: string) {
		return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
	}
}
