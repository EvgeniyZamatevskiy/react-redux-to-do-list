import todolistsSlice, { changeTodolistEntityStatus, changeTodolistFilter } from './slice'
import { TodolistsSliceInitialStateType } from './types'

let startState: TodolistsSliceInitialStateType
let todolistId1: string
let todolistId2: string

beforeEach(() => {
	todolistId1 = 'todo1'
	todolistId2 = 'todo2'
	startState = [
		{ id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
		{ id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 }
	]
})

test('correct filter of todolist should be changed', () => {
	const endState = todolistsSlice(startState, changeTodolistFilter({ id: todolistId1, filter: 'active' }))

	expect(endState[0].filter).toBe('active')
	expect(endState[1].filter).toBe('all')
})

test('correct entity status of todolist should be changed', () => {
	const endState = todolistsSlice(startState, changeTodolistEntityStatus({ id: todolistId1, status: 'loading' }))

	expect(endState[0].entityStatus).toBe('loading')
	expect(endState[1].entityStatus).toBe('idle')
})
