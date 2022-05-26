import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'

export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector