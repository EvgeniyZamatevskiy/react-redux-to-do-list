import { TodolistType } from 'api/todolists/types'

export interface TodolistsSliceInitialStateType {
	todolists: TodolistSupplementedType[]
}

export type TodolistSupplementedType = TodolistType & {
	filter: FilterValuesType
	isDisabled: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'
