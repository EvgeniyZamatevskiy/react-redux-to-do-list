import React, { FC, Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { Route, Routes } from "react-router-dom"
import { ROUTES } from "router"
import classes from "./AppRouter.module.css"

export const AppRouter: FC = () => {
  return (
    <Suspense fallback={<div className={classes.containerLoader}><CircularProgress/></div>}>
      <Routes>
        {ROUTES.map(({path, element}) => <Route key={path} path={path} element={element}/>)}
      </Routes>
    </Suspense>
  )
}
