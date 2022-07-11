import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

	}

	return (
		<Snackbar autoHideDuration={3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
				error
			</Alert>
		</Snackbar>
	)
}