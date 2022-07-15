import { useDispatch } from 'react-redux'
import { DispatchType } from 'redux/store'

export const useAppDispatch = () => useDispatch<DispatchType>()

// export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
