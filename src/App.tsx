import React, { FC, lazy, ReactElement, Suspense, useEffect } from 'react'
import { Container, CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToDoLists } from 'pages'
import { ErrorSnackbar, Header } from 'components'
import { Path } from 'enums/Path'
import { useAppDispatch } from 'redux/hooks'
import { getAuthorizedUserData } from 'redux/auth/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsInitializedApp } from 'redux/app/selectors'

const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */'pages/notFound'))
const Login = lazy(() => import(/* webpackChunkName: 'Login' */'pages/login'))

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
            <Route path={Path.HOME} element={<ToDoLists />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.ERROR_404} element={<NotFound />} />
            <Route path={Path.NOT_FOUND} element={<Navigate to={Path.ERROR_404} />} />
          </Routes>
        </Suspense>
      </Container>
    </div >
  )
}
