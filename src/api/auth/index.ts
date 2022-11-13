import { instance } from "api/config"
import { CommonResponseType } from "api/types"
import { AuthorizedUserType, LoginDataType } from "./types"

export const AUTH = {
  login(loginData: LoginDataType) {
    return instance.post<CommonResponseType<{ userId: number }>>("auth/login", loginData)
  },
  logOut() {
    return instance.delete<CommonResponseType>("auth/login")
  },
  me() {
    return instance.get<CommonResponseType<AuthorizedUserType>>("auth/me")
  }
}
