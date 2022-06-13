import { appActions, appAsyncActions } from './actions'

const appActionCreators = {
	...appAsyncActions,
	...appActions
}

export {
	appActionCreators
}