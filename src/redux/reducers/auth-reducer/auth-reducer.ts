import { AuthReducerActionsType } from './actions'

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

// types
type InitStateType = {
	isAuth: boolean
}