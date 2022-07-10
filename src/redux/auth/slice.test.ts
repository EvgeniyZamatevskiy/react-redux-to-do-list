import { AuthSliceInitialStateType } from './types'
import authSlice, { setIsAuth } from './slice'

let startState: AuthSliceInitialStateType

beforeEach(() => {
	startState = {
		isAuth: false
	}
})

test('the correct authorization status must be set', () => {
	const endState = authSlice(startState, setIsAuth(true))

	expect(endState.isAuth).toBe(true)
})
