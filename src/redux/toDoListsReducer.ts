import { toDoListsAPI, ToDolListType } from '../api/toDoListsAPI'
import { ThunkType } from './store'

const initState: InitStateType = {
	toDoLists: []
}

export const toDoListsReducer = (state: InitStateType = initState, action: ToDoListsReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'GET-TO-DO-LISTS':
			return {
				...state, toDoLists: action.toDoLists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
			}

		default:
			return state
	}
}

// ActionCreators
export const getToDoListsAC = (toDoLists: Array<ToDolListType>) => ({ type: 'GET-TO-DO-LISTS', toDoLists } as const)

// ThunkCreators
export const getToDoListsTC = (): ThunkType => (dispatch) => {
	toDoListsAPI.getToDoLists()
		.then((res) => dispatch(getToDoListsAC(res.data)))
}

// types
type InitStateType = {
	toDoLists: Array<ToDoListSupplementedType>
}

export type ToDoListsReducerActionsType = GetToDoListsActionType

export type GetToDoListsActionType = ReturnType<typeof getToDoListsAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type ToDoListSupplementedType = ToDolListType & {
	filter: FilterValuesType
	entityStatus: any
}