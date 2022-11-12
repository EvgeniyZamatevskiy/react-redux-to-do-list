import { instance } from "api/config"
import { CommonResponseType } from "api/types"
import { ToDoListType } from "./types"

export const TODOLISTS = {
  getToDoLists() {
    return instance.get<ToDoListType[]>("todo-lists")
  },
  addToDoList(toDoListTitle: string) {
    return instance.post<CommonResponseType<{ item: ToDoListType }>>("todo-lists", {title: toDoListTitle})
  },
  removeToDoList(toDoListId: string) {
    return instance.delete<CommonResponseType>(`todo-lists/${toDoListId}`)
  },
  updateToDoListTitle(toDoListId: string, toDoListTitle: string) {
    return instance.put<CommonResponseType>(`todo-lists/${toDoListId}`, {title: toDoListTitle})
  }
}
