import { AppReducerActionsType } from './actions'

const initState: InitStateType = {
	loadingStatus: 'idle',
	error: null,
	isInitialized: false
}

export const appReducer = (state: InitStateType = initState, action: AppReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'APP/SET-LOADING-STATUS':
			return { ...state, loadingStatus: action.loadingStatus }
		case 'APP/SET-ERROR-STATUS':
			return { ...state, error: action.error }
		case 'APP/SET-IS-INITIALIZED':
			return { ...state, isInitialized: action.isInitialized }

		default:
			return state
	}
}

// types
type InitStateType = {
	loadingStatus: StatusType
	error: null | string
	isInitialized: boolean
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'