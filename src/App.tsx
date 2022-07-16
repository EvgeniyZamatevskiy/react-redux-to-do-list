import React, { FC, lazy, Suspense, useEffect } from 'react'
import { Container, CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToDoLists } from 'pages'
import { ErrorSnackbar, Header } from 'components'
import { Path } from 'enums/Path'
import { useAppDispatch } from 'redux/hooks'
import { getAuthorizedUserData } from 'redux/auth/asyncActions'
import { useSelector } from 'react-redux'
import { selectIsInitialized } from 'redux/app/selectors'

const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */'pages/NotFound'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */'pages/Login'))

export const App: FC = () => {

  const dispatch = useAppDispatch()

  const isInitialized = useSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(getAuthorizedUserData())
  }, [])

  if (!isInitialized) {
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
