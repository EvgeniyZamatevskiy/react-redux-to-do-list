import { tasksActions, tasksAsyncActions } from './actions'

const tasksActionCreators = {
	...tasksAsyncActions,
	...tasksActions
}

export {
	tasksActionCreators
}