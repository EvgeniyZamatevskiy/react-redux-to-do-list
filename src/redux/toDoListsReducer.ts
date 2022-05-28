import { toDoListsAPI, ToDolListType } from '../api/toDoListsAPI'
import { setErrorStatusAC, setLoadingStatusAC, StatusType } from './appReducer'
import { ThunkType } from './store'

const initState: InitStateType = {
	toDoLists: []
}

export const toDoListsReducer = (state: InitStateType = initState, action: ToDoListsReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'GET-TO-DO-LISTS':
			return { ...state, toDoLists: action.toDoLists.map(tl => ({ ...tl, filter: 'all', disabledStatus: 'idle' })) }
		case 'ADD-TO-DO-LIST':
			return { ...state, toDoLists: [{ ...action.toDoList, filter: 'all', disabledStatus: 'idle' }, ...state.toDoLists] }
		case 'REMOVE-TO-DO-LIST':
			return { ...state, toDoLists: state.toDoLists.filter(tl => tl.id !== action.id) }
		case 'SET-DISABLED-STATUS':
			return { ...state, toDoLists: state.toDoLists.map(tl => tl.id === action.id ? { ...tl, disabledStatus: action.disabledStatus } : tl) }
		case 'CHANGE-TO-DO-LIST-TITLE':
			return { ...state, toDoLists: state.toDoLists.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl) }

		default:
			return state
	}
}

// ActionCreators
export const getToDoListsAC = (toDoLists: Array<ToDolListType>) => ({ type: 'GET-TO-DO-LISTS', toDoLists } as const)

export const addToDoListAC = (toDoList: ToDolListType) => ({ type: 'ADD-TO-DO-LIST', toDoList } as const)

export const removeToDoListAC = (id: string) => ({ type: 'REMOVE-TO-DO-LIST', id } as const)

export const setDisabledStatusAC = (id: string, disabledStatus: StatusType) => ({ type: 'SET-DISABLED-STATUS', id, disabledStatus } as const)

export const changeToDoListTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TO-DO-LIST-TITLE', id, title } as const)

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
				if (res.data.messages.length) {
					dispatch(setErrorStatusAC(res.data.messages[0]))
				} else {
					dispatch(setErrorStatusAC('Some error occurred'))
				}
				dispatch(setLoadingStatusAC('failed'))
			}
		})
		.catch((error) => {
			dispatch(setErrorStatusAC(error.message ? error.message : 'Some error occurred'))
			dispatch(setLoadingStatusAC('failed'))
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

export const changeToDoListTitleTC = (toDoListId: string, toDoListTitle: string): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	toDoListsAPI.updateToDoList(toDoListId, toDoListTitle)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(changeToDoListTitleAC(toDoListId, toDoListTitle))
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
			setErrorStatusAC(error.message ? error.message : 'Some error occurred')
			dispatch(setLoadingStatusAC('failed'))
		})
}

// types
type InitStateType = {
	toDoLists: Array<ToDoListSupplementedType>
}

export type ToDoListsReducerActionsType =
	GetToDoListsActionType | AddToDoListActionType | RemoveToDoListActionType |
	SetDisabledStatusActionType | ChangeToDoListTitleActionType

export type GetToDoListsActionType = ReturnType<typeof getToDoListsAC>
export type AddToDoListActionType = ReturnType<typeof addToDoListAC>
export type RemoveToDoListActionType = ReturnType<typeof removeToDoListAC>
export type SetDisabledStatusActionType = ReturnType<typeof setDisabledStatusAC>
export type ChangeToDoListTitleActionType = ReturnType<typeof changeToDoListTitleAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type ToDoListSupplementedType = ToDolListType & {
	filter: FilterValuesType
	disabledStatus: StatusType
}