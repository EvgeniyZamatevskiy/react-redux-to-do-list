import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { appActionCreators } from '../../redux/reducers/app-reducer'
import { selectError } from '../../redux/reducers/app-reducer/selectors'
import { useSelector } from 'react-redux'
import { useActions } from '../../redux/hooks/useActions'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {

	const { setErrorStatusAC } = useActions(appActionCreators)
	const error = useSelector(selectError)

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		setErrorStatusAC(null)
	}

	return (
		<Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
				{error}
			</Alert>
		</Snackbar>
	)
}