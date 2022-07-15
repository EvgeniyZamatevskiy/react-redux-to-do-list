import { ResponseCode } from 'enums/ResponseCode'

export type CommonResponseType<T = {}> = {
	data: T,
	messages: string[],
	fieldsErrors: string[],
	resultCode: ResponseCode
}
