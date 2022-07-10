import { TaskType } from '../../../api/tasks/types'
import { TasksReducerActionsType } from './actions'

const initState: InitStateType = {
	tasks: {}
}

export const tasksReducer = (state: InitStateType = initState, action: TasksReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'TASKS/GET-TASKS':
			return { ...state, tasks: { ...state.tasks, [action.toDoListId]: action.tasks } }
		case 'TODOLIST/GET-TODOLISTS':
			const copyState = { ...state, tasks: { ...state.tasks } }
			action.todolists.forEach(tl => {
				copyState.tasks[tl.id] = []
			})
			return copyState
		case 'TODOLIST/ADD-TODOLIST':
			return { ...state, tasks: { ...state.tasks, [action.todolist.id]: [] } }
		case 'TODOLIST/REMOVE-TODOLIST': {
			const copyState = { ...state, tasks: { ...state.tasks } }
			delete copyState.tasks[action.id]
			return copyState
		}
		case 'TASKS/ADD-TASK':
			return { ...state, tasks: { ...state.tasks, [action.task.todoListId]: [action.task, ...state.tasks[action.task.todoListId]] } }
		case 'TASKS/REMOVE-TASK':
			return { ...state, tasks: { ...state.tasks, [action.toDoListId]: state.tasks[action.toDoListId].filter(t => t.id !== action.taskId) } }
		case 'TASKS/UPDATE-TASK':
			return {
				...state, tasks: {
					...state.tasks, [action.toDoListId]: state.tasks[action.toDoListId].map(t => t.id === action.taskId
						? { ...t, ...action.domainModel } : t)
				}
			}

		default:
			return state
	}
}

// types
type InitStateType = {
	tasks: TaskStateType
}

export type TaskStateType = {
	[key: string]: Array<TaskType>
}