import { instance } from './instance'
import { LoginParamsType, CommonResponseType, MeResponseType } from './types'

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