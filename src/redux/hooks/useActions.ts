import { useMemo } from 'react'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useTypedDispatch } from './useTypedDispatch'

export const useActions = <T extends ActionCreatorsMapObject<any>>(actions: T) => {
	const dispatch = useTypedDispatch()

	const boundActions = useMemo(() => {
		return bindActionCreators(actions, dispatch)
	}, [])

	return boundActions
}