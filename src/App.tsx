import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTypedDispatch } from './redux/hooks/useTypedDispatch'
import { initializeAppTC } from './redux/app/asyncActions'
import { TodolistsList, NotFound, Login } from 'pages'
import { Header } from 'components'
import { ErrorSnackbar } from 'components/common'
import { selectIsInitialized } from 'redux/app/selectors'
import { Path } from 'enums/Path'
import './App.css'

export const App = () => {

  const dispatch = useTypedDispatch()

  const isInitialized = useSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
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
    <div className='App'>
      <ErrorSnackbar />
      <Header />
      <Container fixed maxWidth={'xl'}>
        <Routes>
          <Route path={Path.HOME} element={<TodolistsList />} />
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.ERROR_404} element={<NotFound />} />
          <Route path={Path.NOT_FOUND} element={<Navigate to={Path.ERROR_404} />} />
        </Routes>
      </Container>
    </div >
  )
}
