import React, { FC, ReactElement } from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch } from 'hooks'
import { useSelector } from 'react-redux'
import { selectErrorMessage } from 'store/selectors/app'
import { setErrorMessage } from 'store/slices/app'
import { EMPTY_STRING } from 'constants/base'

const DELAY = 3000

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar: FC = (): ReactElement => {

	const dispatch = useAppDispatch()

	const errorMessage = useSelector(selectErrorMessage)

	const resetErrorMessage = (): void => {
		dispatch(setErrorMessage(EMPTY_STRING))
	}

	const onAlertClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
		if (reason === 'clickaway') {
			return
		}
		resetErrorMessage()
	}

	return (
		<Snackbar open={errorMessage !== EMPTY_STRING} autoHideDuration={DELAY} onClose={onAlertClose}>
			<Alert onClose={onAlertClose} severity='error' sx={{ width: '100%' }}>
				{errorMessage}
			</Alert>
		</Snackbar>
	)
}
