export const setDataToLocalStorage = <T>(key: string, data: T): void => {
	localStorage.setItem(key, JSON.stringify(data))
}

export const getParseLocalStorageData = <T>(key: string, defaultData: T): T => {
	const data = localStorage.getItem(key)

	if (data !== null) {
		defaultData = JSON.parse(data) as T
	}

	return defaultData
}
