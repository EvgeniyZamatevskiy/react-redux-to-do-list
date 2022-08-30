import { AxiosError } from 'axios'

export const handleServerNetworkError =
	(err: Error | AxiosError<{ error: string }>, rejectWithValue: (value: { error: string }) => any) => {

		const error = err as Error | AxiosError<{ error: string }>

		return rejectWithValue({ error: error.message })
	}
