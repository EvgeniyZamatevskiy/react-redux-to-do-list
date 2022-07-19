import { ResponseCode } from 'enums'

export type CommonResponseType<T = {}> = {
	data: T,
	messages: string[],
	fieldsErrors: string[],
	resultCode: ResponseCode
}
