import {FC} from "react";
import { Button, ButtonProps, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";


import { getPaletteColor } from './helpers'

type useStylesProps = {
    color?: ButtonProps['color'],
    bordered?: boolean
}
const useStyles = makeStyles<Theme, useStylesProps>(t => ({
    button: {
        border: p => p.bordered ? "3px solid white" : "none",
        borderRadius: 0,
        backgroundColor: p => getPaletteColor(t, p.color),
        color: "white",
        "&:hover": {
            color: p => t.palette.getContrastText(getPaletteColor(t, p.color)),
            backgroundColor: p => getPaletteColor(t, p.color)
        },
        "&:disabled": {
            color: "#b3b3b3",
        }
    }
}),
{ name: "StyledButtonStyles" }
)

type Props = ButtonProps & {
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | "black",
    bordered?: boolean
}

export const StyledButton: FC<Props> = ({color, bordered,...props}) => {
    const styles = useStyles({color, bordered})
    return <Button color={color} {...props} className={clsx(styles.button, props.className)} />
}