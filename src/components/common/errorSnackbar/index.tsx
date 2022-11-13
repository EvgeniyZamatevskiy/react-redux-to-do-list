import React, { FC } from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { AlertProps } from "@mui/material/Alert"
import { useAppDispatch } from "hooks"
import { useSelector } from "react-redux"
import { selectErrorMessage } from "store/selectors"
import { setErrorMessage } from "store/slices/app"
import { EMPTY_STRING } from "constants/base"

const DELAY = 3000

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar: FC = () => {

  const dispatch = useAppDispatch()

  const errorMessage = useSelector(selectErrorMessage)

  const onAlertClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setErrorMessage(EMPTY_STRING))
  }

  return (
    <Snackbar open={!!errorMessage} autoHideDuration={DELAY} onClose={onAlertClose}>
      <Alert onClose={onAlertClose} severity="error" sx={{width: "100%"}}>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}
