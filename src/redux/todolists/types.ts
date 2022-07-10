import { TodolistType } from 'api/todolists/types'
import { StatusType } from 'redux/app/types'

export type TodolistsSliceInitialStateType = ToDoListSupplementedType[]

export type ToDoListSupplementedType = TodolistType & {
	filter: FilterValuesType
	entityStatus: StatusType
}

export type FilterValuesType = 'all' | 'active' | 'completed'
