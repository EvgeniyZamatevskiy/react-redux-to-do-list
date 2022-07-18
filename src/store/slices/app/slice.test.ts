import { EMPTY_STRING } from 'constants/base'
import appSlice, { setErrorMessage } from 'store/slices/app'
import { AppSliceInitialStateType } from './types'

let startState: AppSliceInitialStateType

beforeEach(() => {
	startState = {
		errorMessage: EMPTY_STRING,
		isLoading: false,
		isInitializedApp: false
	}
})

test('correct error message should be set', (() => {
	const endState = appSlice(startState, setErrorMessage('some error occurred!'))

	expect(endState.errorMessage).toBe('some error occurred!')
}))
