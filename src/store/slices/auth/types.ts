import { AuthorizedUserType } from "api/auth/types"
import { Nullable } from "types"

export interface AuthSliceInitialStateType {
  isAuth: boolean
  authorizedUser: Nullable<AuthorizedUserType>
}
