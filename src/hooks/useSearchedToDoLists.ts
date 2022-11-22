import { useMemo } from "react"
import { ToDoListSupplementedType } from "store/slices/toDoLists/types"
import { useSelector } from "react-redux"
import { selectTitleSearchValue } from "store/selectors"

export const useSearchedToDoLists = (toDoLists: ToDoListSupplementedType[]): ToDoListSupplementedType[] => {

  const titleSearchValue = useSelector(selectTitleSearchValue)

  const filteredToDoLists = useMemo(() => {
    return toDoLists.filter(({title}) => title.toLowerCase().includes(titleSearchValue.toLowerCase()))
  }, [toDoLists, titleSearchValue])

  return filteredToDoLists
}
