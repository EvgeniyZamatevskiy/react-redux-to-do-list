import { instance } from './instance'
import { CommonResponseType } from './toDoListsAPI'

export const authAPI = {
	login(data: LoginParamsType) {
		return instance.post<CommonResponseType>('auth/login', data)
	},
	logout() {
		return instance.delete<CommonResponseType>('auth/login')
	},
	me() {
		return instance.get<CommonResponseType<MeResponseType>>('auth/me')
	}
}

// types
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