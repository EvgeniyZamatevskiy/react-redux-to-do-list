import { TaskType } from 'api/tasks/types'
import { RootStateType } from 'redux/store'

export const selectTasks = (toDoListId: string) => (state: RootStateType): TaskType[] => state.tasks.tasks[toDoListId]
