import { ReactElement } from "react"

export type ModalPropsType = {
  children: ReactElement
  isActivatedModal: boolean
  onDeactivateModalClick: () => void
}
