import { Dispatch } from 'redux'
import { CommonResponseType } from '../api/types'
import { setErrorStatusAC, setLoadingStatusAC, SetErrorStatusActionType, SetLoadingStatusActionType } from '../redux/reducers/app-reducer/actions'

export const serverAppErrorHandler = <T>(data: CommonResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
	dispatch(setErrorStatusAC(data.messages.length ? data.messages[0] : 'Some error occurred'))
	dispatch(setLoadingStatusAC('failed'))
}

export const serverNetworkErrorHandler = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
	dispatch(setErrorStatusAC(error.message ? error.message : 'Some error occurred'))
	dispatch(setLoadingStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorStatusActionType | SetLoadingStatusActionType>