import {makeStyles, Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>(t => ({
    card: {
        width: "450px",
        [t.breakpoints.down("sm")]: {
            width: "300px",
        },
    },
    card_media: {
        height: "350px",
        [t.breakpoints.down("sm")]: {
            height: "250px",
        },
    }
}))