import { TaskType } from "api/tasks/types"
import { RootStateType } from "store"

export const selectTasks = (toDoListId: string) => (state: RootStateType): TaskType[] => state.tasks.tasks[toDoListId]
