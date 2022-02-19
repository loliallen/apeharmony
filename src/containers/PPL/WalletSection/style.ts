import {makeStyles, Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>(t => ({
    header: {
        lineHeight: "1.3",
        paddingLeft: "2rem",
        display: "flex",
        justifyContent: "space-between"
    },
    typo: {
        [t.breakpoints.down('sm')]: {
            fontSize: "4.571429rem"
        },
        marginTop: "4rem",
        color: "gray"
    }
}))