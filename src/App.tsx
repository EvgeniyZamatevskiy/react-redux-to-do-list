import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { ToDoListsList } from './pages/ToDoListsList/ToDoListsList'
import { Header } from './components/Header/Header'
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { initializeAppTC } from './redux/appReducer'
import { useTypedDispatch, useTypedSelector } from './redux/store'
import './App.css'

export const App = () => {

  const dispatch = useTypedDispatch()
  const { isInitialized } = useTypedSelector(state => state.app)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return <div
      style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
      <CircularProgress />
    </div>
  }

  return (
    <div className='App'>
      <ErrorSnackbar />
      <Header />
      <Container fixed maxWidth={'xl'}>
        <Routes>
          <Route path={'/'} element={<ToDoListsList />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'404'} element={<h1 style={{ textAlign: 'center' }}>404 page not found</h1>} />
          <Route path={'*'} element={<Navigate to={'404'} />} />
        </Routes>
      </Container>
    </div >
  )
}