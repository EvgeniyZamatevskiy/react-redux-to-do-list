import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'
import { tasksReducer, TasksReducerActionsType } from './tasksReducer'
import { toDoListsReducer, ToDoListsReducerActionsType } from './toDoListsReducer'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	toDoLists: toDoListsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// types
export type RootReducerType = ReturnType<typeof rootReducer>
export type AllActionsType = TasksReducerActionsType | ToDoListsReducerActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, AllActionsType>