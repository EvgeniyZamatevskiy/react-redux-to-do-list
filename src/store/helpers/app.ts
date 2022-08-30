import { AnyAction } from '@reduxjs/toolkit'

export const isLoadingFulfilled = (action: AnyAction) => action.type.endsWith('fulfilled')

export const isLoadingRejected = (action: AnyAction) => action.type.endsWith('rejected')

export const isLoadingPending = (action: AnyAction) => action.type.endsWith('pending')

export const isErrorRejected = (action: AnyAction) => {
	return action.type.endsWith('rejected') && action.type !== 'auth/getAuthorizedUserData/rejected'
}
