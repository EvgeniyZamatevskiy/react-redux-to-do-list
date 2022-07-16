import { ToDoListType } from 'api/toDoLists/types'

export interface ToDoListsSliceInitialStateType {
	toDoLists: ToDoListSupplementedType[]
}

export type ToDoListSupplementedType = ToDoListType & {
	filter: FilterValuesType
	isDisabled: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'
