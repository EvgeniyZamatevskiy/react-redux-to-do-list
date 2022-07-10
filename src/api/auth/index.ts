import { instance } from '../config'
import { CommonResponseType } from '../types'
import { LoginParamsType, MeResponseType } from './types'

export const AUTH = {
	login(loginParams: LoginParamsType) {
		return instance.post<CommonResponseType>('auth/login', loginParams)
	},
	logout() {
		return instance.delete<CommonResponseType>('auth/login')
	},
	me() {
		return instance.get<CommonResponseType<MeResponseType>>('auth/me')
	}
}
