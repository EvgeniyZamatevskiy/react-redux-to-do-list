import { ToDoListsSliceInitialStateType } from './types'
import toDoListSlice, { changeToDoListFilter } from 'redux/toDoLists/slice'

let startState: ToDoListsSliceInitialStateType

beforeEach(() => {
	startState = {
		toDoLists: [
			{ id: 'toDoListId_1', title: 'new toDoList1', addedDate: '11:10', order: 1, filter: 'all', isDisabled: false },
			{ id: 'toDoListId_2', title: 'new toDoList2', addedDate: '17:45', order: 2, filter: 'all', isDisabled: false },
			{ id: 'toDoListId_3', title: 'new toDoList3', addedDate: '14:46', order: 3, filter: 'all', isDisabled: false }
		]
	}
})

test('correct filter of to do list should be changed', (() => {
	const endState = toDoListSlice(startState, changeToDoListFilter({ toDoListId: 'toDoListId_2', value: 'active' }))

	expect(endState.toDoLists[0].filter).toBe('all')
	expect(endState.toDoLists[1].filter).toBe('active')
	expect(endState.toDoLists[2].filter).toBe('all')
}))
