import { Theme, makeStyles } from "@material-ui/core"


export const useStyles = makeStyles<Theme>(t => ({
    container: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        [t.breakpoints.down('sm')]: {
            width: "95%",

        }
    }
}),
{ name: "DescriptionStyles" }
)