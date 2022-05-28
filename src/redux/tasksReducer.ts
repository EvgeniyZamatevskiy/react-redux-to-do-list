import { tasksAPI, TaskType } from '../api/tasksAPI'
import { setErrorStatusAC, setLoadingStatusAC } from './appReducer'
import { ThunkType } from './store'
import { AddToDoListActionType, GetToDoListsActionType, RemoveToDoListActionType, setDisabledStatusAC } from './toDoListsReducer'

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
		case 'ADD-TO-DO-LIST':
			return { ...state, tasks: { ...state.tasks, [action.toDoList.id]: [] } }
		case 'REMOVE-TO-DO-LIST': {
			const copyState = { ...state, tasks: { ...state.tasks } }
			delete copyState.tasks[action.id]
			return copyState
		}
		case 'ADD-TASK':
			return { ...state, tasks: { ...state.tasks, [action.task.todoListId]: [action.task, ...state.tasks[action.task.todoListId]] } }
		case 'REMOVE-TASK':
			return { ...state, tasks: { ...state.tasks, [action.toDoListId]: state.tasks[action.toDoListId].filter(t => t.id !== action.taskId) } }

		default:
			return state
	}
}

// ActionCreators
export const getTasksAC = (toDoListId: string, tasks: Array<TaskType>) => ({ type: 'GET-TASKS', toDoListId, tasks } as const)

export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)

export const removeTaskAC = (toDoListId: string, taskId: string) => ({ type: 'REMOVE-TASK', toDoListId, taskId } as const)

// ThunkCreators
export const getTasksTC = (toDoListId: string): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	tasksAPI.getTasks(toDoListId)
		.then((res) => {
			dispatch(getTasksAC(toDoListId, res.data.items))
			dispatch(setLoadingStatusAC('succeeded'))
		})
}

export const addTaskTC = (toDoListId: string, title: string): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	tasksAPI.addTask(toDoListId, title)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(addTaskAC(res.data.data.item))
				dispatch(setLoadingStatusAC('succeeded'))
			} else {
				if (res.data.messages.length) {
					dispatch(setErrorStatusAC(res.data.messages[0]))
					dispatch(setLoadingStatusAC('failed'))
				} else {
					dispatch(setErrorStatusAC('Some error occurred'))
					dispatch(setLoadingStatusAC('failed'))
				}
				dispatch(setLoadingStatusAC('failed'))
			}
		})
		.catch((error) => {
			dispatch(setErrorStatusAC(error.message ? error.message : 'Some error occurred'))
			dispatch(setLoadingStatusAC('failed'))
		})
}

export const removeTaskTC = (toDoListId: string, taskId: string): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	dispatch(setDisabledStatusAC(toDoListId, 'loading'))
	tasksAPI.removeTask(toDoListId, taskId)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(removeTaskAC(toDoListId, taskId))
				dispatch(setLoadingStatusAC('succeeded'))
				dispatch(setDisabledStatusAC(toDoListId, 'succeeded'))
			} else {
				if (res.data.messages.length) {
					dispatch(setErrorStatusAC(res.data.messages[0]))
					dispatch(setLoadingStatusAC('failed'))
					dispatch(setDisabledStatusAC(toDoListId, 'failed'))
				} else {
					setErrorStatusAC('Some error occurred')
					dispatch(setLoadingStatusAC('failed'))
					dispatch(setDisabledStatusAC(toDoListId, 'failed'))
				}
				dispatch(setLoadingStatusAC('failed'))
				dispatch(setDisabledStatusAC(toDoListId, 'failed'))
			}
		})
		.catch((error) => {
			dispatch(setErrorStatusAC(error.message ? error.message : 'Some error occurred'))
			dispatch(setLoadingStatusAC('failed'))
			dispatch(setDisabledStatusAC(toDoListId, 'failed'))
		})
}

// types
type InitStateType = {
	tasks: TaskStateType
}

export type TasksReducerActionsType =
	GetTasksActionType | GetToDoListsActionType | AddToDoListActionType |
	RemoveToDoListActionType | AddTaskActionType | RemoveTaskActionType

type GetTasksActionType = ReturnType<typeof getTasksAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type TaskStateType = {
	[key: string]: Array<TaskType>
}