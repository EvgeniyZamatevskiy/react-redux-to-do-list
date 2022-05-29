import { Dispatch } from 'redux'
import { CommonResponseType } from '../api/toDoListsAPI'
import { setErrorStatusAC, SetErrorStatusActionType, setLoadingStatusAC, SetLoadingStatusActionType } from './../redux/appReducer'

export const serverAppErrorHandler = <D>(data: CommonResponseType<D>, dispatch: Dispatch<SetErrorStatusActionType | SetLoadingStatusActionType>) => {
	if (data.messages.length) {
		dispatch(setErrorStatusAC(data.messages[0]))
	} else {
		dispatch(setErrorStatusAC('Some error occurred'))
	}
	dispatch(setLoadingStatusAC('failed'))
}

export const serverNetworkErrorHandler = (error: { message: string }, dispatch: Dispatch<SetErrorStatusActionType | SetLoadingStatusActionType>) => {
	dispatch(setErrorStatusAC(error.message ? error.message : 'Some error occurred'))
	dispatch(setLoadingStatusAC('failed'))
}