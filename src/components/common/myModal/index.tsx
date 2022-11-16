import React, { FC } from "react"
import { ModalPropsType } from "./types"
import Backdrop from "@mui/material/Backdrop"
import Modal from "@mui/material/Modal"

export const MyModal: FC<ModalPropsType> = ({children, isActivatedModal, onDeactivateModalClick, ...props}) => {
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={isActivatedModal}
      onClose={onDeactivateModalClick}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{timeout: 500}}
    >
      <>{children}</>
    </Modal>
  )
}
