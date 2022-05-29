import { serverAppErrorHandler, serverNetworkErrorHandler } from './../utils/errorUtils'
import { setIsAuthAC } from './authReducer'
import { ThunkType } from './store'
import { authAPI } from '../api/auth'

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

// ActionCreators
export const setLoadingStatusAC = (loadingStatus: StatusType) => ({ type: 'APP/SET-LOADING-STATUS', loadingStatus } as const)

export const setErrorStatusAC = (error: string | null) => ({ type: 'APP/SET-ERROR-STATUS', error } as const)

export const setAppIsInitializedAC = (isInitialized: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', isInitialized } as const)

// ThunkCreators
export const initializeAppTC = (): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	authAPI.me()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsAuthAC(true))
				dispatch(setLoadingStatusAC('succeeded'))
			} else {
				serverAppErrorHandler(res.data, dispatch)
			}
		})
		.catch((error) => {
			serverNetworkErrorHandler(error, dispatch)
		})
		.finally(() => {
			dispatch(setAppIsInitializedAC(true))
		})
}

// types
type InitStateType = {
	loadingStatus: StatusType
	error: null | string
	isInitialized: boolean
}

export type AppReducerActionsType = SetLoadingStatusActionType | SetErrorStatusActionType | SetAppIsInitializedActionType

export type SetLoadingStatusActionType = ReturnType<typeof setLoadingStatusAC>
export type SetErrorStatusActionType = ReturnType<typeof setErrorStatusAC>
export type SetAppIsInitializedActionType = ReturnType<typeof setAppIsInitializedAC>

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'