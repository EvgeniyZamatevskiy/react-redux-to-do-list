import { RootStateType } from "store"
import { TaskSupplementedType } from "store/slices/tasks/types"

export const selectTasks = (toDoListId: string) => (state: RootStateType): TaskSupplementedType[] => state.tasks.tasks[toDoListId]
