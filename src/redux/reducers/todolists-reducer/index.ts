import { todolistsActions, todolistsAsyncActions } from './actions'

const todolistsActionCreators = {
	...todolistsAsyncActions,
	...todolistsActions
}

export {
	todolistsActionCreators,
}