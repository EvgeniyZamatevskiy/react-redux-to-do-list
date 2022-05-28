import { ThunkType } from './store'

const initState: InitStateType = {
	loadingStatus: 'idle',
	error: null
}

export const appReducer = (state: InitStateType = initState, action: AppReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'SET-LOADING-STATUS':
			return { ...state, loadingStatus: action.loadingStatus }
		case 'SET-ERROR-STATUS':
			return { ...state, error: action.error }

		default:
			return state
	}
}

// ActionCreators
export const setLoadingStatusAC = (loadingStatus: StatusType) => ({ type: 'SET-LOADING-STATUS', loadingStatus } as const)

export const setErrorStatusAC = (error: string | null) => ({ type: 'SET-ERROR-STATUS', error } as const)

// ThunkCreators

// types
type InitStateType = {
	loadingStatus: StatusType
	error: null | string
}

export type AppReducerActionsType = SetLoadingStatusActionType | SetErrorStatusActionType

type SetLoadingStatusActionType = ReturnType<typeof setLoadingStatusAC>
type SetErrorStatusActionType = ReturnType<typeof setErrorStatusAC>

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'