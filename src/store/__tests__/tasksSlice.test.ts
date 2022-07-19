import { TaskPriority, TaskStatus } from 'api/tasks/types'
import { addTask, addToDoList, getTasks, getToDoLists, logOut, removeTask, removeToDoList, updateTask } from 'store/asyncActions'
import { TasksSliceInitialStateType } from 'store/slices/tasks/types'
import tasksSlice from 'store/slices/tasks'

let startState: TasksSliceInitialStateType

beforeEach(() => {
	startState = {
		tasks: {
			'todolistId1': [
				{
					id: '1', title: 'CSS', status: TaskStatus.Active, todoListId: 'todolistId1', description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
				},
				{
					id: '2', title: 'JS', status: TaskStatus.Completed, todoListId: 'todolistId1', description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
				},
				{
					id: '3', title: 'React', status: TaskStatus.Active, todoListId: 'todolistId1', description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
				}
			],
			'todolistId2': [
				{
					id: '1', title: 'bread', status: TaskStatus.Active, todoListId: 'todolistId2', description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
				},
				{
					id: '2', title: 'milk', status: TaskStatus.Completed, todoListId: 'todolistId2', description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
				},
				{
					id: '3', title: 'tea', status: TaskStatus.Active, todoListId: 'todolistId2', description: '',
					startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
				}
			]
		}
	}
})

test('empty arrays should be added when we set todolists', () => {

	const startState = {
		tasks: {}
	}

	const toDoLists = [
		{ id: '1', title: 'title 1', order: 0, addedDate: '' },
		{ id: '2', title: 'title 2', order: 0, addedDate: '' }
	]

	const action = getToDoLists.fulfilled(toDoLists, 'requestId', undefined)

	const endState = tasksSlice(startState, action)

	const keys = Object.keys(endState.tasks)

	expect(keys.length).toBe(2)
	expect(endState.tasks['1']).toBeDefined()
	expect(endState.tasks['2']).toBeDefined()
})

test('new array should be added when new todolist is added', () => {

	const toDoList = { id: '1', title: 'new todolist', order: 0, addedDate: '' }

	const action = addToDoList.fulfilled(toDoList, 'requestId', toDoList.title)

	const endState = tasksSlice(startState, action)

	const keys = Object.keys(endState.tasks)
	const newKey = keys.find(key => key != 'todolistId1' && key != 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState.tasks[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
	const action = removeToDoList.fulfilled('todolistId2', 'requestId', 'todolistId2')

	const endState = tasksSlice(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState.tasks['todolistId2']).not.toBeDefined()
})

test('tasks should be added for todolist', () => {

	const action = getTasks.fulfilled({ toDoListId: 'todolistId1', tasks: startState.tasks['todolistId1'] }, 'requestId', 'todolistId1')

	const endState = tasksSlice({
		tasks: {
			'todolistId2': [],
			'todolistId1': []
		}
	}, action)

	expect(endState.tasks['todolistId1'].length).toBe(3)
	expect(endState.tasks['todolistId2'].length).toBe(0)
})

test('correct task should be added to correct array', () => {

	const task = {
		todoListId: 'todolistId2',
		title: 'apple',
		status: TaskStatus.Active,
		addedDate: '',
		deadline: '',
		description: '',
		order: 0,
		priority: 0,
		startDate: '',
		id: 'id exists'
	}

	const params = { toDoListId: task.todoListId, title: task.title }

	const action = addTask.fulfilled(task, 'requestId', params)

	const endState = tasksSlice(startState, action)

	expect(endState.tasks['todolistId1'].length).toBe(3)
	expect(endState.tasks['todolistId2'].length).toBe(4)
	expect(endState.tasks['todolistId2'][0].id).toBeDefined()
	expect(endState.tasks['todolistId2'][0].title).toBe('apple')
	expect(endState.tasks['todolistId2'][0].status).toBe(TaskStatus.Active)
})

test('correct task should be deleted from correct array', () => {

	const params = { toDoListId: 'todolistId1', taskId: '1' }

	const action = removeTask.fulfilled(params, 'requestId', params)

	const endState = tasksSlice(startState, action)

	expect(endState.tasks['todolistId1'].length).toBe(2)
	expect(endState.tasks['todolistId2'].length).toBe(3)
	expect(endState.tasks['todolistId1'].every(task => task.id != '1')).toBeTruthy()
})

test('status and title should be changed', () => {

	const payload = { toDoListId: 'todolistId2', taskId: '2', domainPayload: { status: TaskStatus.Active, title: 'yogurt' } }

	const action = updateTask.fulfilled(payload, 'requestId', payload)

	const endState = tasksSlice(startState, action)

	expect(endState.tasks['todolistId1'][1].status).toBe(TaskStatus.Completed)
	expect(endState.tasks['todolistId2'][1].status).toBe(TaskStatus.Active)
	expect(endState.tasks['todolistId1'][1].title).toBe('JS')
	expect(endState.tasks['todolistId2'][1].title).toBe('yogurt')
	expect(endState.tasks['todolistId2'][0].title).toBe('bread')
})

test('task object should be nulled', () => {

	const action = logOut.fulfilled(undefined, 'requestId', undefined)

	const endState = tasksSlice(startState, action)

	expect(endState.tasks).toStrictEqual({})
})
