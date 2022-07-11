import React, { FC } from 'react'
import Container from '@mui/material/Container'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistsList, NotFound, Login } from 'pages'
import { Header } from 'components'
import { ErrorSnackbar } from 'components/common'
import { Path } from 'enums/Path'
import './App.css'

export const App: FC = () => {
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
