import { RootStateType } from '../store'

export const selectIsAuth = (state: RootStateType) => state.auth.isAuth
