import { tasksAPI, TaskType } from '../api/tasksAPI'
import { AppThunkType } from './store'
import { GetToDoListsActionType } from './toDoListsReducer'

const initState: InitStateType = {
	tasks: {}
}

export const tasksReducer = (state: InitStateType = initState, action: TasksReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'GET-TASKS':
			return { ...state, tasks: { ...state.tasks, [action.toDoListId]: action.tasks } }
		case 'GET-TO-DO-LISTS':
			const copyState = { ...state, tasks: { ...state.tasks } }
			action.toDoLists.forEach(tl => {
				copyState.tasks[tl.id] = []
			})
			return copyState

		default:
			return state
	}
}

// ActionCreators
export const getTasksAC = (toDoListId: string, tasks: Array<TaskType>) => ({ type: 'GET-TASKS', toDoListId, tasks } as const)

// ThunkCreators
export const getTasksTC = (toDoListId: string): AppThunkType => (dispatch) => {
	tasksAPI.getTasks(toDoListId)
		.then((res) => dispatch(getTasksAC(toDoListId, res.data.items)))
}

// types
type InitStateType = {
	tasks: TaskStateType
}

export type TasksReducerActionsType = GetTasksActionType | GetToDoListsActionType

type GetTasksActionType = ReturnType<typeof getTasksAC>

export type TaskStateType = {
	[key: string]: Array<TaskType>
}