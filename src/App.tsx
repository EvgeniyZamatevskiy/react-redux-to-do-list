import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { Header } from './components/Header/Header'
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { NotFound } from './pages/NotFound/NotFound'
import { appActionCreators } from './redux/reducers/app-reducer'
import { selectIsInitialized } from './redux/reducers/app-reducer/selectors'
import { useSelector } from 'react-redux'
import { useActions } from './redux/hooks/useActions'
import { TodolistsList } from './pages/TodolistsList/ToDoListsList'
import './App.css'

export const App = () => {

  const isInitialized = useSelector(selectIsInitialized)
  const { initializeAppTC } = useActions(appActionCreators)

  useEffect(() => {
    initializeAppTC()
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
          <Route path={'/'} element={<TodolistsList />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'404'} element={<NotFound />} />
          <Route path={'*'} element={<Navigate to={'404'} />} />
        </Routes>
      </Container>
    </div >
  )
}