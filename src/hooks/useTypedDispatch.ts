import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootStateType } from 'redux/store'

export const useTypedDispatch = () => useDispatch<DispatchType>()

export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
