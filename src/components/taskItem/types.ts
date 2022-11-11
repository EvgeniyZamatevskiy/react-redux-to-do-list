import { TaskStatus } from 'api/tasks/types'

export type TaskPropsType = {
	toDoListId: string
	taskId: string
	status: TaskStatus
	title: string
	isDisabled: boolean
}
