import { ToDoListType } from 'api/toDoLists/types'
import { FilterValue } from 'enums/FilterValue'

export interface ToDoListsSliceInitialStateType {
	toDoLists: ToDoListSupplementedType[]
}

export type ToDoListSupplementedType = ToDoListType & {
	filter: FilterValue
	isDisabled: boolean
}
