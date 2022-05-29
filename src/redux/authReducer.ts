import { authAPI, LoginParamsType } from '../api/auth'
import { serverAppErrorHandler, serverNetworkErrorHandler } from '../utils/errorUtils'
import { setLoadingStatusAC } from './appReducer'
import { ThunkType } from './store'

const initState: InitStateType = {
	isAuth: false
}

export const authReducer = (state: InitStateType = initState, action: AuthReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'AUTH/SET-IS-AUTH':
			return { ...state, isAuth: action.isAuth }

		default:
			return state
	}
}

// ActionCreators
export const setIsAuthAC = (isAuth: boolean) => ({ type: 'AUTH/SET-IS-AUTH', isAuth } as const)

// ThunkCreators
export const loginTC = (data: LoginParamsType): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	authAPI.login(data)
		.then((res) => {
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
}

export const logoutTC = (): ThunkType => (dispatch) => {
	dispatch(setLoadingStatusAC('loading'))
	authAPI.logout()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsAuthAC(false))
				dispatch(setLoadingStatusAC('succeeded'))
			} else {
				serverAppErrorHandler(res.data, dispatch)
			}
		})
		.catch((error) => {
			serverNetworkErrorHandler(error, dispatch)
		})
}

// types
type InitStateType = {
	isAuth: boolean
}

type SetIsAuthActionType = ReturnType<typeof setIsAuthAC>

export type AuthReducerActionsType = SetIsAuthActionType