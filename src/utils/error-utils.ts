import { Dispatch } from 'redux'
import { CommonResponseType } from '../api/types'

export const serverAppErrorHandler = <T>(data: CommonResponseType<T>, dispatch: any) => {
	// dispatch(setErrorStatusAC(data.messages.length ? data.messages[0] : 'Some error occurred'))
	// dispatch(setLoadingStatusAC('failed'))
}

export const serverNetworkErrorHandler = (error: { message: string }, dispatch: any) => {
	// dispatch(setErrorStatusAC(error.message ? error.message : 'Some error occurred'))
	// dispatch(setLoadingStatusAC('failed'))
}

//type ErrorUtilsDispatchType = Dispatch<SetErrorStatusActionType | SetLoadingStatusActionType>