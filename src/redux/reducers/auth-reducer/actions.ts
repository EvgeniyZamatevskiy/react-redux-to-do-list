import { AUTH } from '../../../api/auth'
import { LoginParamsType } from '../../../api/auth/types'
import { serverAppErrorHandler, serverNetworkErrorHandler } from '../../../utils/error-utils'
import { ThunkType } from '../../store'
import { setLoadingStatusAC } from '../app-reducer/actions'

// ActionCreators
export const setIsAuthAC = (isAuth: boolean) => ({ type: 'AUTH/SET-IS-AUTH', isAuth } as const)

// ThunkCreators
export const loginTC = (data: LoginParamsType): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	try {
		const res = await AUTH.login(data)
		if (res.data.resultCode === 0) {
			dispatch(setIsAuthAC(true))
			dispatch(setLoadingStatusAC('succeeded'))
		} else {
			serverAppErrorHandler(res.data, dispatch)
		}
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)
	}
}

export const logoutTC = (): ThunkType => async (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	try {
		const res = await AUTH.logout()
		if (res.data.resultCode === 0) {
			dispatch(setIsAuthAC(false))
			dispatch(setLoadingStatusAC('succeeded'))
		} else {
			serverAppErrorHandler(res.data, dispatch)
		}
	} catch (error: any) {
		serverNetworkErrorHandler(error, dispatch)
	}
}

export const authAsyncActions = {
	loginTC,
	logoutTC
}

export const authActions = {
	setIsAuthAC
}

// types
type SetIsAuthActionType = ReturnType<typeof setIsAuthAC>

export type AuthReducerActionsType = SetIsAuthActionType