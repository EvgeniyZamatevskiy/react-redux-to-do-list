export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type AuthorizedUserDataType = {
  id: number
  email: string
  login: string
}
