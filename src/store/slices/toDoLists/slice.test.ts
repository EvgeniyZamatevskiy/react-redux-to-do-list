import { ToDoListsSliceInitialStateType } from './types'
import toDoListSlice, { changeToDoListFilter } from 'store/slices/toDoLists'
import { FilterValue } from 'enums/FilterValue'

let startState: ToDoListsSliceInitialStateType

beforeEach(() => {
	startState = {
		toDoLists: [
			{ id: 'toDoListId_1', title: 'new toDoList1', addedDate: '11:10', order: 1, filter: FilterValue.ALL, isDisabled: false },
			{ id: 'toDoListId_2', title: 'new toDoList2', addedDate: '17:45', order: 2, filter: FilterValue.ALL, isDisabled: false },
			{ id: 'toDoListId_3', title: 'new toDoList3', addedDate: '14:46', order: 3, filter: FilterValue.ALL, isDisabled: false }
		]
	}
})

test('correct filter of to do list should be changed', (() => {
	const endState = toDoListSlice(startState, changeToDoListFilter({ toDoListId: 'toDoListId_2', value: FilterValue.ACTIVE }))

	expect(endState.toDoLists[0].filter).toBe(FilterValue.ALL)
	expect(endState.toDoLists[1].filter).toBe(FilterValue.ACTIVE)
	expect(endState.toDoLists[2].filter).toBe(FilterValue.ALL)
}))
