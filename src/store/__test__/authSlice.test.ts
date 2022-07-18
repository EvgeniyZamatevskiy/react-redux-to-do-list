import { getAuthorizedUserData, logOut } from 'store/asyncActions'
import { AuthSliceInitialStateType } from 'store/slices/auth/types'
import authSlice from 'store/slices/auth'

let startState: AuthSliceInitialStateType

beforeEach(() => {
	startState = {
		authorizedUserData: { email: '', id: 0, login: '' },
		isAuth: false
	}
})

test('the authorization status should change and the user data should be reset', () => {
	const action = logOut.fulfilled(undefined, 'requestId', undefined)

	const endState = authSlice(startState, action)

	expect(endState.isAuth).toBe(false)
	expect(endState.authorizedUserData).toBe(null)
})

test('the authorization status should change and set authorized user data', () => {

	const authorizedUserData = { id: 32, email: 'test@gmail.com', login: 'testLogin' }

	const action = getAuthorizedUserData.fulfilled(authorizedUserData, 'requestId', undefined)

	const endState = authSlice(startState, action)

	expect(endState.isAuth).toBe(true)
	expect(endState.authorizedUserData).toBe(authorizedUserData)
})