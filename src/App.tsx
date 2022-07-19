import React, { FC, ReactElement, Suspense, useEffect } from 'react'
import { Container, CircularProgress } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { ErrorSnackbar, Header } from 'components'
import { useAppDispatch } from 'store/hooks'
import { getAuthorizedUserData } from 'store/asyncActions/auth'
import { useSelector } from 'react-redux'
import { selectIsInitializedApp } from 'store/selectors/app'
import { ROUTES } from 'router'

export const App: FC = (): ReactElement => {

  const dispatch = useAppDispatch()

  const isInitializedApp = useSelector(selectIsInitializedApp)

  useEffect(() => {
    dispatch(getAuthorizedUserData())
  }, [])

  if (!isInitializedApp) {
    return <div className='preloader'><CircularProgress /></div>
  }

  return (
    <div className='app'>
      <ErrorSnackbar />
      <Header />
      <Container fixed maxWidth={'xl'}>
        <Suspense fallback={<div className='preloader'><CircularProgress /></div>}>
          <Routes>
            {ROUTES.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
          </Routes>
        </Suspense>
      </Container>
    </div >
  )
}
