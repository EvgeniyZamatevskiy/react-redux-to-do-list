import { Dispatch } from 'redux'
import { CommonResponseType } from '../api/toDoListsAPI'
import { setErrorStatusAC, SetErrorStatusActionType, setLoadingStatusAC, SetLoadingStatusActionType } from './../redux/appReducer'

export const serverAppErrorHandler = <T>(data: CommonResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
	if (data.messages.length) {
		dispatch(setErrorStatusAC(data.messages[0]))
	} else {
		dispatch(setErrorStatusAC('Some error occurred'))
	}
	dispatch(setLoadingStatusAC('failed'))
}

export const serverNetworkErrorHandler = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
	dispatch(setErrorStatusAC(error.message ? error.message : 'Some error occurred'))
	dispatch(setLoadingStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorStatusActionType | SetLoadingStatusActionType>