import { TodolistType } from '../../../api/types'
import { StatusType } from '../app-reducer/app-reducer'
import { FilterValuesType, TodolistsReducerActionsType } from './actions'

const initState: InitStateType = {
	todolists: []
}

export const todolistsReducer = (state: InitStateType = initState, action: TodolistsReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'TODOLIST/GET-TODOLISTS':
			return { ...state, todolists: action.todolists.map(tl => ({ ...tl, filter: 'all', disabledStatus: 'idle' })) }
		case 'TODOLIST/ADD-TODOLIST':
			return { ...state, todolists: [{ ...action.todolist, filter: 'all', disabledStatus: 'idle' }, ...state.todolists] }
		case 'TODOLIST/REMOVE-TODOLIST':
			return { ...state, todolists: state.todolists.filter(tl => tl.id !== action.id) }
		case 'TODOLIST/SET-DISABLED-STATUS':
			return { ...state, todolists: state.todolists.map(tl => tl.id === action.id ? { ...tl, disabledStatus: action.disabledStatus } : tl) }
		case 'TODOLIST/CHANGE-TODOLIST-TITLE':
			return { ...state, todolists: state.todolists.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl) }
		case 'TODOLIST/CHANGE-TODOLIST-FILTER':
			return { ...state, todolists: state.todolists.map(tl => tl.id === action.id ? { ...tl, filter: action.value } : tl) }

		default:
			return state
	}
}

// types
type InitStateType = {
	todolists: Array<TodolistSupplementedType>
}

export type TodolistSupplementedType = TodolistType & {
	filter: FilterValuesType
	disabledStatus: StatusType
}