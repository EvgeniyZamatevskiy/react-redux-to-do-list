import { ToDoListType } from 'api/toDoLists/types'
import { FilterValue } from 'enums/FilterValue'
import { addToDoList, changeToDoListTitle, getToDoLists, logOut, removeToDoList } from 'store/asyncActions'
import toDoListsSlice, { changeToDoListFilter, setIsDisabled } from 'store/slices/toDoLists'
import { ToDoListsSliceInitialStateType } from 'store/slices/toDoLists/types'


let toDoListId1: string
let toDoListId2: string
let startState: ToDoListsSliceInitialStateType

beforeEach(() => {
	toDoListId1 = 'toDoListId1'
	toDoListId2 = 'toDoListId2'
	startState = {
		toDoLists: [
			{ id: toDoListId1, title: 'What to learn', filter: FilterValue.ALL, isDisabled: false, addedDate: '', order: 0 },
			{ id: toDoListId2, title: 'What to buy', filter: FilterValue.ALL, isDisabled: false, addedDate: '', order: 0 }
		]
	}
})

test('to do lists should be added', () => {

	const toDoLists = startState.toDoLists

	const action = getToDoLists.fulfilled(toDoLists, 'requestId', undefined)

	const endState = toDoListsSlice({ toDoLists: [] }, action)

	expect(endState.toDoLists.length).toBe(2)
})

test('correct to do list should be added', () => {

	const toDoList: ToDoListType = { title: 'New ToDoList', id: 'any id', addedDate: '', order: 0 }

	const action = addToDoList.fulfilled(toDoList, 'requestId', toDoList.title)

	const endState = toDoListsSlice(startState, action)

	expect(endState.toDoLists.length).toBe(3)
	expect(endState.toDoLists[0].title).toBe(toDoList.title)
	expect(endState.toDoLists[0].filter).toBe(FilterValue.ALL)
})

test('correct to do list should be removed', () => {

	const action = removeToDoList.fulfilled(toDoListId1, 'requestId', toDoListId1)

	const endState = toDoListsSlice(startState, action)

	expect(endState.toDoLists.length).toBe(1)
	expect(endState.toDoLists[0].id).toBe(toDoListId2)
})

test('correct to do list should change its name', () => {

	const params = { toDoListId: toDoListId2, title: 'New Todolist' }

	const action = changeToDoListTitle.fulfilled(params, 'requestId', params)

	const endState = toDoListsSlice(startState, action)

	expect(endState.toDoLists[0].title).toBe('What to learn')
	expect(endState.toDoLists[1].title).toBe('New Todolist')
})

test('to do list array should be nulled', () => {

	const action = logOut.fulfilled(undefined, 'requestId', undefined)

	const endState = toDoListsSlice(startState, action)

	expect(endState.toDoLists).toStrictEqual([])
})

test('correct filter of to do list should be changed', () => {

	const newValue: FilterValue = FilterValue.COMPLETED
	const action = changeToDoListFilter({ toDoListId: toDoListId2, value: newValue })

	const endState = toDoListsSlice(startState, action)

	expect(endState.toDoLists[0].filter).toBe(FilterValue.ALL)
	expect(endState.toDoLists[1].filter).toBe(newValue)
})

test('correct disabled status of to do list should be changed', () => {

	const action = setIsDisabled({ toDoListId: toDoListId2, isDisabled: true })

	const endState = toDoListsSlice(startState, action)

	expect(endState.toDoLists[0].isDisabled).toBe(false)
	expect(endState.toDoLists[1].isDisabled).toBe(true)
})
