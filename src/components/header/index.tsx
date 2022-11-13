import React, { FC } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import LinearProgress from "@mui/material/LinearProgress"
import { useSelector } from "react-redux"
import { useAppDispatch } from "hooks"
import { logOut } from "store/asyncActions"
import { selectLoadingStatus, selectIsAuth, selectAuthorizedUserData } from "store/selectors"
import { Link, useLocation } from "react-router-dom"
import { Path } from "enums"
import classes from "./Header.module.css"

export const Header: FC = () => {

  const {pathname} = useLocation()

  const dispatch = useAppDispatch()

  const loadingStatus = useSelector(selectLoadingStatus)
  const isAuth = useSelector(selectIsAuth)
  const authorizedUserData = useSelector(selectAuthorizedUserData)

  const onLogOutClick = (): void => {
    dispatch(logOut())
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link to={Path.HOME} className={classes.title}>To Do List</Link>
        </Typography>
        {isAuth && pathname === Path.HOME &&
          <>
            <div className={classes.login}>{authorizedUserData?.login}</div>
            <Button color="inherit" onClick={onLogOutClick}>Log out</Button>
          </>
        }
      </Toolbar>
      {loadingStatus === "loading" && <LinearProgress/>}
    </AppBar>
  )
}
