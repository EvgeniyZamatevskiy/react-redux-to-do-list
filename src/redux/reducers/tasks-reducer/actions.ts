import { TASKS } from '../../../api/tasks'
import { TaskType, UpdateDomainTaskModelType, UpdateTaskModelType } from '../../../api/tasks/types'
import { serverNetworkErrorHandler, serverAppErrorHandler } from '../../../utils/error-utils'
import { ThunkType } from '../../store'
import { setLoadingStatusAC } from '../app-reducer/actions'
import { setDisabledStatusAC, GetTodolistsActionType, AddTodolistActionType, RemoveTodolistActionType } from '../todolists-reducer/actions'

// ActionCreators
export const getTasksAC = (toDoListId: string, tasks: Array<TaskType>) =>
	({ type: 'TASKS/GET-TASKS', toDoListId, tasks } as const)

export const addTaskAC = (task: TaskType) =>
	({ type: 'TASKS/ADD-TASK', task } as const)

export const removeTaskAC = (toDoListId: string, taskId: string) =>
	({ type: 'TASKS/REMOVE-TASK', toDoListId, taskId } as const)

export const updateTaskAC = (toDoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
	({ type: 'TASKS/UPDATE-TASK', toDoListId, taskId, domainModel } as const)

// ThunkCreators
export const getTasksTC = (toDoListId: string): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	try {
		const res = await TASKS.getTasks(toDoListId)
		dispatch(getTasksAC(toDoListId, res.data.items))
		dispatch(setLoadingStatusAC('succeeded'))
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)
	}
}

export const addTaskTC = (toDoListId: string, title: string): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	const res = await TASKS.addTask(toDoListId, title)
	try {
		if (res.data.resultCode === 0) {
			dispatch(addTaskAC(res.data.data.item))
			dispatch(setLoadingStatusAC('succeeded'))
		} else {
			serverAppErrorHandler(res.data, dispatch)
		}
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)
	}
}

export const removeTaskTC = (toDoListId: string, taskId: string): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	dispatch(setDisabledStatusAC(toDoListId, 'loading'))
	try {
		const res = await TASKS.removeTask(toDoListId, taskId)
		if (res.data.resultCode === 0) {
			dispatch(removeTaskAC(toDoListId, taskId))
			dispatch(setLoadingStatusAC('succeeded'))
			dispatch(setDisabledStatusAC(toDoListId, 'succeeded'))
		} else {
			serverAppErrorHandler(res.data, dispatch)
			dispatch(setDisabledStatusAC(toDoListId, 'failed'))
		}
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)
		dispatch(setDisabledStatusAC(toDoListId, 'failed'))
	}
}

export const updateTaskTC = (toDoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkType => async (dispatch, getState) => {
	const state = getState()
	const task = state.tasks.tasks[toDoListId].find(t => t.id === taskId)
	if (task) {
		const model: UpdateTaskModelType = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			title: task.title,
			status: task.status,
			...domainModel
		}
		dispatch(setLoadingStatusAC('loading'))
		try {
			const res = await TASKS.updateTask(toDoListId, taskId, model)
			if (res.data.resultCode === 0) {
				dispatch(updateTaskAC(toDoListId, taskId, domainModel))
				dispatch(setLoadingStatusAC('succeeded'))
			} else {
				serverAppErrorHandler(res.data, dispatch)
			}
		} catch (error: any) {
			serverNetworkErrorHandler(error, dispatch)
		}
	}
}

// export const updateTaskStatusTC = (toDoListId: string, taskId: string, updatedStatus: TaskStatus): ThunkType => async (dispatch, getState) => {
// 	const state = getState()
// 	const task = state.tasks.tasks[toDoListId].find(t => t.id === taskId)
// 	if (task) {
// 		const model: UpdateTaskModelType = {
// 			deadline: task.deadline,
// 			description: task.description,
// 			priority: task.priority,
// 			startDate: task.startDate,
// 			title: task.title,
// 			status: updatedStatus
// 		}
// 		dispatch(setLoadingStatusAC('loading'))
// 		try {
// 			const res = await TASKS.updateTask(toDoListId, taskId, model)
// 			if (res.data.resultCode === 0) {
// 				dispatch(updateTaskAC(toDoListId, taskId, updatedStatus))
// 				dispatch(setLoadingStatusAC('succeeded'))
// 			} else {
// 				serverAppErrorHandler(res.data, dispatch)
// 			}
// 		} catch (error: any) {
// 			serverNetworkErrorHandler(error, dispatch)
// 		}
// 	}
// }

export const tasksAsyncActions = {
	getTasksTC,
	addTaskTC,
	removeTaskTC,
	updateTaskTC,
}

export const tasksActions = {
	getTasksAC,
	addTaskAC,
	removeTaskAC,
	updateTaskAC
}

// types
export type TasksReducerActionsType =
	GetTasksActionType | GetTodolistsActionType | AddTodolistActionType |
	RemoveTodolistActionType | AddTaskActionType | RemoveTaskActionType |
	UpdateTaskActionType

type GetTasksActionType = ReturnType<typeof getTasksAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>