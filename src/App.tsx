import React, { FC, lazy, Suspense, useEffect } from 'react'
import Container from '@mui/material/Container'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Todolists } from 'pages'
import { Header } from 'components'
import { ErrorSnackbar } from 'components/common'
import { Path } from 'enums/Path'
import { CircularProgress } from '@mui/material'
import { useAppDispatch } from 'redux/hooks'
import { getAuthorizedUserData } from 'redux/auth/asyncActions'
import Login from 'pages/Login'
import { useSelector } from 'react-redux'
import { selectIsInitialized } from 'redux/app/selectors'

const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */'pages/NotFound'))
//const Login = lazy(() => import(/* webpackChunkName: "Login" */'pages/Login'))

export const App: FC = () => {

  const dispatch = useAppDispatch()

  const isInitialized = useSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(getAuthorizedUserData())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div style={{ marginTop: '60px' }}>
      <ErrorSnackbar />
      <Header />
      <Container fixed maxWidth={'xl'}>
        <Suspense fallback={<div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
          <CircularProgress />
        </div>}>
          <Routes>
            <Route path={Path.HOME} element={<Todolists />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.ERROR_404} element={<NotFound />} />
            <Route path={Path.NOT_FOUND} element={<Navigate to={Path.ERROR_404} />} />
          </Routes>
        </Suspense>
      </Container>
    </div >
  )
}
