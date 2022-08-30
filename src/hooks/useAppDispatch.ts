import { useDispatch } from 'react-redux'
import { DispatchType } from 'store'

export const useAppDispatch = () => useDispatch<DispatchType>()
