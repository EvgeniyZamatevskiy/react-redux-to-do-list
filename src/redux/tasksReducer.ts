import { serverAppErrorHandler, serverNetworkErrorHandler } from './../utils/errorUtils'
import { UpdateTaskModelType, TaskPriority, tasksAPI, TaskStatus, TaskType } from '../api/tasksAPI'
import { setLoadingStatusAC } from './appReducer'
import { ThunkType } from './store'
import { AddToDoListActionType, GetToDoListsActionType, RemoveToDoListActionType, setDisabledStatusAC } from './toDoListsReducer'

const initState: InitStateType = {
	tasks: {}
}

export const tasksReducer = (state: InitStateType = initState, action: TasksReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'TASKS/GET-TASKS':
			return { ...state, tasks: { ...state.tasks, [action.toDoListId]: action.tasks } }
		case 'TO-DO-LIST/GET-TO-DO-LISTS':
			const copyState = { ...state, tasks: { ...state.tasks } }
			action.toDoLists.forEach(tl => {
				copyState.tasks[tl.id] = []
			})
			return copyState
		case 'TO-DO-LIST/ADD-TO-DO-LIST':
			return { ...state, tasks: { ...state.tasks, [action.toDoList.id]: [] } }
		case 'TO-DO-LIST/REMOVE-TO-DO-LIST': {
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
						? { ...t, ...action.taskModel } : t)
				}
			}

		default:
			return state
	}
}

// ActionCreators
export const getTasksAC = (toDoListId: string, tasks: Array<TaskType>) => ({ type: 'TASKS/GET-TASKS', toDoListId, tasks } as const)

export const addTaskAC = (task: TaskType) => ({ type: 'TASKS/ADD-TASK', task } as const)

export const removeTaskAC = (toDoListId: string, taskId: string) => ({ type: 'TASKS/REMOVE-TASK', toDoListId, taskId } as const)

export const updateTaskAC = (toDoListId: string, taskId: string, taskModel: UpdateDomainTaskModelType) => ({ type: 'TASKS/UPDATE-TASK', toDoListId, taskId, taskModel } as const)

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
				serverAppErrorHandler(res.data, dispatch)
			}
		})
		.catch((error) => {
			serverNetworkErrorHandler(error, dispatch)
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
				serverAppErrorHandler(res.data, dispatch)
				dispatch(setDisabledStatusAC(toDoListId, 'failed'))
			}
		})
		.catch((error) => {
			serverNetworkErrorHandler(error, dispatch)
			dispatch(setDisabledStatusAC(toDoListId, 'failed'))
		})
}

export const updateTaskTC = (toDoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkType => (dispatch, getState) => {
	const state = getState()
	const task = state.tasks.tasks[toDoListId].find((t) => t.id === taskId)
	if (!task) {
		console.warn('task not found in the state')
		return
	}

	const apiModel: UpdateTaskModelType = {
		deadline: task.deadline,
		description: task.description,
		priority: task.priority,
		startDate: task.startDate,
		title: task.title,
		status: task.status,
		...domainModel
	}

	dispatch(setLoadingStatusAC('loading'))
	tasksAPI.updateTask(toDoListId, taskId, apiModel)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(updateTaskAC(toDoListId, taskId, domainModel))
				dispatch(setLoadingStatusAC('succeeded'))
			} else {
				serverAppErrorHandler(res.data, dispatch)
			}
		})
		.catch((error) => {
			serverNetworkErrorHandler(error, dispatch)
		})
}

// types
type InitStateType = {
	tasks: TaskStateType
}

export type TasksReducerActionsType =
	GetTasksActionType | GetToDoListsActionType | AddToDoListActionType |
	RemoveToDoListActionType | AddTaskActionType | RemoveTaskActionType |
	UpdateTaskActionType

type GetTasksActionType = ReturnType<typeof getTasksAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type TaskStateType = {
	[key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string,
	status?: TaskStatus
	priority?: TaskPriority
	startDate?: string
	deadline?: string
}