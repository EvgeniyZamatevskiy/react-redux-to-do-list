import { ResponseCode } from 'enums/ResponseCode'
import { FieldErrorType } from 'redux/store'

export type CommonResponseType<T = {}> = {
	data: T
	messages: string[]
	fieldsErrors?: FieldErrorType[]
	resultCode: ResponseCode
}
