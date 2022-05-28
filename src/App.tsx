import React from 'react'
import { Container } from '@mui/material'
import { ToDoListsList } from './pages/ToDoListsList/ToDoListsList'
import { Header } from './components/Header/Header'
import './App.css'
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar'

export const App = () => {
  return (
    <div>
      <ErrorSnackbar />
      <Header />
      <Container fixed>
        <ToDoListsList />
      </Container>
    </div>
  )
}