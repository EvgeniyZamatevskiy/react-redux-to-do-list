import { authActions, authAsyncActions } from './actions'

const authActionCreators = {
	...authAsyncActions,
	...authActions
}

export {
	authActionCreators
}