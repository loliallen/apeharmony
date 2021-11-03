import { Button, ButtonProps } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles"
import { ModTheme } from "../../interfaces";

export const PixelButtonBase = withStyles({
    root: {
        borderRadius: 0,
        zIndex: 1,
        boxShadow: "none",
        "&:hover": {
            boxShadow: "none",
        }
    }
})(Button)


type Props = {
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
}


const useStyles = makeStyles<ModTheme, Props>(t => ({
    container: {
        position: "relative",
        marginLeft: "10px",
        marginRight: "10px",

        //   -webkit-touch-callout: none;
        //   -webkit-user-select: none;
        //   -khtml-user-select: none;
        //   -moz-user-select: none;
        //   -ms-user-select: none;
        userSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        "&:before": {
            pointerEvents: "none",
            content: `\"\"`,
            display: "block",
            position: "absolute",
            top: "10px",
            bottom: "10px",
            left: "-10px",
            right: "-10px",
            background: (p) => p.color ? t.palette[p.color].main : t.palette['primary'].main,
            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transitionProperty: "background-color, box-shadow, border-color, color",
            transitionDuration: "250ms, 250ms, 250ms, 250ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDelay: "0ms, 0ms, 0ms, 0ms"
        },
        "&:after": {
            pointerEvents: "none",
            content: `\"\"`,
            display: "block",
            position: "absolute",
            top: "4px",
            bottom: "4px",
            left: "-6px",
            right: "-6px",
            background: (p) => p.color ? t.palette[p.color].main : t.palette['primary'].main,
            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transitionProperty: "background-color, box-shadow, border-color, color",
            transitionDuration: "250ms, 250ms, 250ms, 250ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDelay: "0ms, 0ms, 0ms, 0ms"
        },
        "&:hover": {
            boxShadow: "none!important",
            backgroundColor: (p) => p.color ? t.palette[p.color].dark : t.palette['primary'].dark,
            "&:after":
            {
                textDecoration: "none",
                backgroundColor: (p) => p.color ? t.palette[p.color].dark : t.palette['primary'].dark,
                boxShadow: "none"
            },
            "&:before": {
                textDecoration: "none",
                backgroundColor: (p) => p.color ? t.palette[p.color].dark : t.palette['primary'].dark,
                boxShadow: "none"
            },
            "& button": {
                backgroundColor: (p) => p.color ? t.palette[p.color].dark : t.palette['primary'].dark,
                boxShadow: "none"
            }
        }
    }

}))

export const PixelButton = (props: ButtonProps) => {
    const classes = useStyles({ color: props.color })
    return <div className={classes.container}>
        <PixelButtonBase {...props} fullWidth />
    </div>
}