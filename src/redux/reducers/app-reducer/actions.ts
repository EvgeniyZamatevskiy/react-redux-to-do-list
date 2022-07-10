import { AUTH } from '../../../api/auth'
import { serverAppErrorHandler, serverNetworkErrorHandler } from '../../../utils/error-utils'
import { ThunkType } from '../../store'
import { setIsAuthAC } from '../auth-reducer/actions'
import { StatusType } from './app-reducer'

// ActionCreators
export const setLoadingStatusAC = (loadingStatus: StatusType) => ({ type: 'APP/SET-LOADING-STATUS', loadingStatus } as const)

export const setErrorStatusAC = (error: string | null) => ({ type: 'APP/SET-ERROR-STATUS', error } as const)

export const setAppIsInitializedAC = (isInitialized: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', isInitialized } as const)

// ThunkCreators
export const initializeAppTC = (): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	try {
		const res = await AUTH.me()
		if (res.data.resultCode === 0) {
			dispatch(setIsAuthAC(true))
			dispatch(setLoadingStatusAC('succeeded'))
		} else {
			serverAppErrorHandler(res.data, dispatch)
		}
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)

	} finally {
		dispatch(setAppIsInitializedAC(true))
	}
}

export const appAsyncActions = {
	initializeAppTC
}

export const appActions = {
	setLoadingStatusAC,
	setErrorStatusAC,
	setAppIsInitializedAC
}

// types
export type AppReducerActionsType = SetLoadingStatusActionType | SetErrorStatusActionType | SetAppIsInitializedActionType

export type SetLoadingStatusActionType = ReturnType<typeof setLoadingStatusAC>
export type SetErrorStatusActionType = ReturnType<typeof setErrorStatusAC>
export type SetAppIsInitializedActionType = ReturnType<typeof setAppIsInitializedAC>