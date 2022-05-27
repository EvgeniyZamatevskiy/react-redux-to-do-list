import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { tasksReducer, TasksReducerActionsType } from './tasksReducer'
import { toDoListsReducer, ToDoListsReducerActionsType } from './toDoListsReducer'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	toDoLists: toDoListsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// hooks
export const useTypedDispatch = () => useDispatch<DispatchType>()
export const useTypedSelector: TypedUseSelectorHook<RootReducerType> = useSelector

// types
export type RootReducerType = ReturnType<typeof rootReducer>
export type AllActionsType = TasksReducerActionsType | ToDoListsReducerActionsType
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, AllActionsType>
export type DispatchType = ThunkDispatch<RootReducerType, any, AllActionsType>