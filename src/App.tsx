import React, { FC, ReactElement, useEffect } from "react"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import { ErrorSnackbar, Header, AppRouter } from "components"
import { useAppDispatch } from "hooks"
import { useSelector } from "react-redux"
import { selectIsInitializedApp } from "store/selectors/app"
import { getAuthorizedUserData } from "store/asyncActions"

export const App: FC = (): ReactElement => {

  const dispatch = useAppDispatch()

  const isInitializedApp = useSelector(selectIsInitializedApp)

  useEffect(() => {
    dispatch(getAuthorizedUserData())
  }, [])

  if (!isInitializedApp) {
    return <div className="preloader"><CircularProgress/></div>
  }

  return (
    <div className="app">
      <Header/>
      <Container fixed maxWidth={"xl"}>
        <AppRouter/>
      </Container>
      <ErrorSnackbar/>
    </div>
  )
}
