import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ActionCreatorsMapObject, AnyAction, applyMiddleware, bindActionCreators, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { useTypedDispatch } from './hooks/useTypedDispatch'
import { AppReducerActionsType } from './reducers/app-reducer/actions'
import { appReducer } from './reducers/app-reducer/app-reducer'
import { AuthReducerActionsType } from './reducers/auth-reducer/actions'
import { authReducer } from './reducers/auth-reducer/auth-reducer'
import { TasksReducerActionsType } from './reducers/tasks-reducer/actions'
import { tasksReducer } from './reducers/tasks-reducer/tasks-reducer'
import { TodolistsReducerActionsType } from './reducers/todolists-reducer/actions'
import { todolistsReducer } from './reducers/todolists-reducer/todolists-reducer'

const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	todolists: todolistsReducer,
	tasks: tasksReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// types
export type RootReducerType = ReturnType<typeof rootReducer>
export type AllActionsType = TasksReducerActionsType | TodolistsReducerActionsType | AppReducerActionsType | AuthReducerActionsType
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, AllActionsType>
export type DispatchType = ThunkDispatch<RootReducerType, unknown, AnyAction>