import appSlice, { setError } from 'redux/app/slice'
import { AppSliceInitialStateType } from './types'

let startState: AppSliceInitialStateType

beforeEach(() => {
	startState = {
		error: null,
		isLoading: false,
		isInitialized: false
	}
})

test('correct error message should be set', (() => {
	const endState = appSlice(startState, setError('my error!'))

	expect(endState.error).toBe('my error!')
}))
