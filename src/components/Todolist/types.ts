import { FilterValue } from 'enums'

export type ToDoListPropsType = {
	toDoListId: string,
	filter: FilterValue,
	isDisabled: boolean,
	title: string
}
