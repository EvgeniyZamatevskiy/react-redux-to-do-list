import React, { FC } from "react"
import { ConfirmPropsType } from "./types"
import Fade from "@mui/material/Fade"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 270,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

export const Confirm: FC<ConfirmPropsType> =
  ({
     isActivatedModal,
     firstCallback,
     firstValue,
     secondValue,
     secondCallback,
     title
   }) => {
    return (
      <Fade in={isActivatedModal}>
        <Box sx={style}>
          <Typography sx={{fontWeight: 500}} component="div">
            {title}
          </Typography>
          <div style={{marginTop: 20, display: "flex", justifyContent: "end"}}>
            <Button variant={"outlined"} color={"info"} size={"small"} onClick={firstCallback}>
              {firstValue}
            </Button>
            <Button sx={{ml: 1}} variant={"outlined"} color={"error"} size={"small"} onClick={secondCallback}>
              {secondValue}
            </Button>
          </div>
        </Box>
      </Fade>
    )
  }
