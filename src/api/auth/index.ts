import { instance } from "api/config"
import { CommonResponseType } from "api/types"
import { AuthorizedUserDataType, LoginParamsType } from "./types"
import { AxiosResponse } from "axios"

export const AUTH = {
  login(loginParams: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<CommonResponseType<{ userId: number }>>>("auth/login", loginParams)
  },
  logOut() {
    return instance.delete<CommonResponseType>("auth/login")
  },
  me() {
    return instance.get<CommonResponseType<AuthorizedUserDataType>>("auth/me")
  }
}
