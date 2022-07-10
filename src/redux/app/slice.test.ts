import { AppSliceInitialStateType } from './types'
import appSlice, { setErrorStatus, setIsInitialized } from './slice'
import { setLoadingStatus } from './slice'

let startState: AppSliceInitialStateType

beforeEach(() => {
	startState = {
		loadingStatus: 'idle',
		error: null,
		isInitialized: false
	}
})

test('correct status should be set', () => {
	const endState = appSlice(startState, setLoadingStatus('loading'))

	expect(endState.loadingStatus).toBe('loading')
})

test('correct error message should be set', () => {
	const endState = appSlice(startState, setErrorStatus('some error'))

	expect(endState.error).toBe('some error')
})

test('application must be initialized', () => {
	const endState = appSlice(startState, setIsInitialized(true))

	expect(endState.isInitialized).toBe(true)
})

