import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles<Theme>(t => ({
    container: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        [t.breakpoints.down('sm')]: {
            width: "95%",

        }
    }
}))