import { todolistsAPI } from '../../../api/todolistsAPI'
import { TodolistType } from '../../../api/types'
import { serverNetworkErrorHandler, serverAppErrorHandler } from '../../../utils/error-utils'
import { ThunkType } from '../../store'
import { setLoadingStatusAC } from '../app-reducer/actions'
import { StatusType } from '../app-reducer/app-reducer'

// ActionCreators
export const getTodolistsAC = (todolists: Array<TodolistType>) => ({ type: 'TODOLIST/GET-TODOLISTS', todolists } as const)

export const addTodolistAC = (todolist: TodolistType) => ({ type: 'TODOLIST/ADD-TODOLIST', todolist } as const)

export const removeTodolistAC = (id: string) => ({ type: 'TODOLIST/REMOVE-TODOLIST', id } as const)

export const setDisabledStatusAC = (id: string, disabledStatus: StatusType) => ({ type: 'TODOLIST/SET-DISABLED-STATUS', id, disabledStatus } as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({ type: 'TODOLIST/CHANGE-TODOLIST-TITLE', id, title } as const)

export const changeTodolistFilterAC = (id: string, value: FilterValuesType) => ({ type: 'TODOLIST/CHANGE-TODOLIST-FILTER', id, value } as const)

// ThunkCreators
export const getTodolistsTC = (): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	try {
		const res = await todolistsAPI.getTodolists()
		dispatch(getTodolistsAC(res.data))
		dispatch(setLoadingStatusAC('succeeded'))
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)
	}
}

export const addTodolistTC = (title: string): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	try {
		const res = await todolistsAPI.addTodolist(title)
		if (res.data.resultCode === 0) {
			dispatch(addTodolistAC(res.data.data.item))
			dispatch(setLoadingStatusAC('succeeded'))
		} else {
			serverAppErrorHandler(res.data, dispatch)
		}
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)
	}
}

export const removeTodolistTC = (id: string): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	dispatch(setDisabledStatusAC(id, 'loading'))
	try {
		const res = await todolistsAPI.removeTodolist(id)
		if (res.data.resultCode === 0) {
			dispatch(removeTodolistAC(id))
			dispatch(setLoadingStatusAC('succeeded'))
		} else {
			serverAppErrorHandler(res.data, dispatch)
		}
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)

	}
}

export const changeTodolistTitleTC = (todolistId: string, toDoListTitle: string): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	try {
		const res = await todolistsAPI.updateTodolist(todolistId, toDoListTitle)
		if (res.data.resultCode === 0) {
			dispatch(changeTodolistTitleAC(todolistId, toDoListTitle))
			dispatch(setLoadingStatusAC('succeeded'))
		} else {
			serverAppErrorHandler(res.data, dispatch)
		}
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)
	}
}

export const todolistsAsyncActions = {
	getTodolistsTC,
	addTodolistTC,
	removeTodolistTC,
	changeTodolistTitleTC,
}

export const todolistsActions = {
	getTodolistsAC,
	addTodolistAC,
	removeTodolistAC,
	setDisabledStatusAC,
	changeTodolistTitleAC,
	changeTodolistFilterAC,
}

// types
export type TodolistsReducerActionsType =
	GetTodolistsActionType | AddTodolistActionType | RemoveTodolistActionType |
	SetDisabledStatusActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetDisabledStatusActionType = ReturnType<typeof setDisabledStatusAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type FilterValuesType = 'all' | 'active' | 'completed'