import React from 'react'
import { Container } from '@mui/material'
import { ToDoListsList } from './pages/ToDoListsList/ToDoListsList'
import { Header } from './components/Header/Header'
import './App.css'

export const App = () => {
  return (
    <div>
      <Header />
      <Container fixed>
        <ToDoListsList />
      </Container>
    </div>
  )
}