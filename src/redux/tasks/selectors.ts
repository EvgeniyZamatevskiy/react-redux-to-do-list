import { RootStateType } from 'redux/store'
import { TasksType } from './types'

export const selectTasks = (state: RootStateType): TasksType => state.tasks.tasks
