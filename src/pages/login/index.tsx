import React, { FC } from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useFormik } from "formik"
import { useAppDispatch } from "hooks"
import { login } from "store/asyncActions/auth"
import { useSelector } from "react-redux"
import { selectIsAuth } from "store/selectors/auth"
import { Navigate } from "react-router-dom"
import { Path } from "enums/Path"
import { EMPTY_STRING } from "constants/base"
import { FormikErrorType } from "./types"
import { LoginDataType } from "api/auth/types"
import classes from "./Login.module.css"

export const Login: FC = () => {

  const dispatch = useAppDispatch()

  const isAuth = useSelector(selectIsAuth)

  const formik = useFormik({
    initialValues: {email: EMPTY_STRING, password: EMPTY_STRING, rememberMe: false},
    validate: (values: LoginDataType) => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = "Email is required!"
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Password is required!"
      }

      if (values.password.length < 3) {
        errors.password = "Password must be more than 3 characters!"
      }

      return errors
    },
    onSubmit: (values: LoginDataType) => {
      dispatch(login(values))
      // formik.resetForm()
    },
  })

  if (isAuth) {
    return <Navigate to={Path.HOME}/>
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered:
              <a href={"https://social-network.samuraijs.com/"} target={"_blank"}> here</a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                // name="email"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.email}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email &&
                <div className={classes.errorMessage}>{formik.errors.email}</div>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password &&
                <div className={classes.errorMessage}>{formik.errors.password}</div>}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    // name={'rememberMe'}
                    // checked={formik.values.rememberMe}
                    // onChange={formik.handleChange}
                    {...formik.getFieldProps("rememberMe")}
                    // checked={formik.values.rememberMe} Для очистки rememberMe
                  />
                }/>
              <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
