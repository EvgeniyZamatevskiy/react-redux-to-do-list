import { toDoListsAPI, ToDolListType } from '../api/toDoListsAPI'
import { serverAppErrorHandler, serverNetworkErrorHandler } from '../utils/errorUtils'
import { setLoadingStatusAC, StatusType } from './appReducer'
import { ThunkType } from './store'

const initState: InitStateType = {
	toDoLists: []
}

export const toDoListsReducer = (state: InitStateType = initState, action: ToDoListsReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'TO-DO-LIST/GET-TO-DO-LISTS':
			return { ...state, toDoLists: action.toDoLists.map(tl => ({ ...tl, filter: 'all', disabledStatus: 'idle' })) }
		case 'TO-DO-LIST/ADD-TO-DO-LIST':
			return { ...state, toDoLists: [{ ...action.toDoList, filter: 'all', disabledStatus: 'idle' }, ...state.toDoLists] }
		case 'TO-DO-LIST/REMOVE-TO-DO-LIST':
			return { ...state, toDoLists: state.toDoLists.filter(tl => tl.id !== action.id) }
		case 'TO-DO-LIST/SET-DISABLED-STATUS':
			return { ...state, toDoLists: state.toDoLists.map(tl => tl.id === action.id ? { ...tl, disabledStatus: action.disabledStatus } : tl) }
		case 'TO-DO-LIST/CHANGE-TO-DO-LIST-TITLE':
			return { ...state, toDoLists: state.toDoLists.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl) }
		case 'TO-DO-LIST/CHANGE-TO-DO-LIST-FILTER':
			return { ...state, toDoLists: state.toDoLists.map(tl => tl.id === action.id ? { ...tl, filter: action.value } : tl) }

		default:
			return state
	}
}

// ActionCreators
export const getToDoListsAC = (toDoLists: Array<ToDolListType>) => ({ type: 'TO-DO-LIST/GET-TO-DO-LISTS', toDoLists } as const)

export const addToDoListAC = (toDoList: ToDolListType) => ({ type: 'TO-DO-LIST/ADD-TO-DO-LIST', toDoList } as const)

export const removeToDoListAC = (id: string) => ({ type: 'TO-DO-LIST/REMOVE-TO-DO-LIST', id } as const)

export const setDisabledStatusAC = (id: string, disabledStatus: StatusType) => ({ type: 'TO-DO-LIST/SET-DISABLED-STATUS', id, disabledStatus } as const)

export const changeToDoListTitleAC = (id: string, title: string) => ({ type: 'TO-DO-LIST/CHANGE-TO-DO-LIST-TITLE', id, title } as const)

export const changeToDoListFilterAC = (id: string, value: FilterValuesType) => ({ type: 'TO-DO-LIST/CHANGE-TO-DO-LIST-FILTER', id, value } as const)

// ThunkCreators
export const getToDoListsTC = (): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	toDoListsAPI.getToDoLists()
		.then((res) => {
			dispatch(getToDoListsAC(res.data))
			dispatch(setLoadingStatusAC('succeeded'))
		})
}

export const addToDoListTC = (title: string): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	toDoListsAPI.addToDoList(title)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(addToDoListAC(res.data.data.item))
				dispatch(setLoadingStatusAC('succeeded'))
			} else {
				serverAppErrorHandler(res.data, dispatch)
			}
		})
		.catch((error) => {
			serverNetworkErrorHandler(error, dispatch)
		}
		)
}

export const removeToDoListTC = (id: string): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	dispatch(setDisabledStatusAC(id, 'loading'))
	toDoListsAPI.removeToDoList(id)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(removeToDoListAC(id))
				dispatch(setLoadingStatusAC('succeeded'))
			} else {
				serverAppErrorHandler(res.data, dispatch)
			}
		})
		.catch((error) => {
			serverNetworkErrorHandler(error, dispatch)
		})
}

export const changeToDoListTitleTC = (toDoListId: string, toDoListTitle: string): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	toDoListsAPI.updateToDoList(toDoListId, toDoListTitle)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(changeToDoListTitleAC(toDoListId, toDoListTitle))
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
	toDoLists: Array<ToDoListSupplementedType>
}

export type ToDoListsReducerActionsType =
	GetToDoListsActionType | AddToDoListActionType | RemoveToDoListActionType |
	SetDisabledStatusActionType | ChangeToDoListTitleActionType | ChangeToDoListFilterActionType

export type GetToDoListsActionType = ReturnType<typeof getToDoListsAC>
export type AddToDoListActionType = ReturnType<typeof addToDoListAC>
export type RemoveToDoListActionType = ReturnType<typeof removeToDoListAC>
export type SetDisabledStatusActionType = ReturnType<typeof setDisabledStatusAC>
export type ChangeToDoListTitleActionType = ReturnType<typeof changeToDoListTitleAC>
export type ChangeToDoListFilterActionType = ReturnType<typeof changeToDoListFilterAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type ToDoListSupplementedType = ToDolListType & {
	filter: FilterValuesType
	disabledStatus: StatusType
}