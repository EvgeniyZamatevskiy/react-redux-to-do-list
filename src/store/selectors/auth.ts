import { AuthorizedUserDataType } from "api/auth/types"
import { RootStateType } from "store"
import { Nullable } from "types"

export const selectIsAuth = (state: RootStateType): boolean => state.auth.isAuth

export const selectAuthorizedUserData = (state: RootStateType): Nullable<AuthorizedUserDataType> => state.auth.authorizedUserData

