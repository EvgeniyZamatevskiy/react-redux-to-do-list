import { TodolistsSliceInitialStateType } from './types'
import todolistSlice, { changeTodolistFilter } from 'redux/todolists/slice'

let startState: TodolistsSliceInitialStateType

beforeEach(() => {
	startState = {
		todolists: [
			{ id: 'todolistId_1', title: 'new todolist1', addedDate: '11:10', order: 1, filter: 'all', isDisabled: false },
			{ id: 'todolistId_2', title: 'new todolist2', addedDate: '17:45', order: 2, filter: 'all', isDisabled: false },
			{ id: 'todolistId_3', title: 'new todolist3', addedDate: '14:46', order: 3, filter: 'all', isDisabled: false }
		]
	}
})

test('correct filter of todolist should be changed', (() => {
	const endState = todolistSlice(startState, changeTodolistFilter({ todolistId: 'todolistId_2', value: 'active' }))

	expect(endState.todolists[0].filter).toBe('all')
	expect(endState.todolists[1].filter).toBe('active')
	expect(endState.todolists[2].filter).toBe('all')
}))
