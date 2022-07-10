export type LoginParamsType = {
	email: string
	password: string
	rememberMe?: boolean
	captcha?: string
}

export type MeResponseType = {
	id: number
	email: string
	login: string
}
