import { AuthorizedUserDataType } from "api/auth/types"
import { Nullable } from "types"

export interface AuthSliceInitialStateType {
  isAuth: boolean
  authorizedUserData: Nullable<AuthorizedUserDataType>
}
