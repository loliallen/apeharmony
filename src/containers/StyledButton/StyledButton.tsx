import { Button, ButtonProps, Theme, Palette, PaletteColor } from "@mui/material";
import { makeStyles } from "@mui/styles";

import clsx from "clsx";

import { ModTheme } from '../../interfaces'
import { getPaletteColor } from './helpers'

type useStylesProps = {
    color?: ButtonProps['color'],
    border?: boolean
}
const useStyles = makeStyles<Theme, useStylesProps>(t => ({
    button: {
        border: p => p.border ? "3px solid white" : "none",
        borderRadius: 0,
        backgroundColor: p => getPaletteColor(t as ModTheme, p.color),
        color: p => t.palette.getContrastText(getPaletteColor(t as ModTheme, p.color)),
        "&:hover": {
            color: p => t.palette.getContrastText(getPaletteColor(t as ModTheme, p.color)),
            backgroundColor: p => getPaletteColor(t as ModTheme, p.color)
        }
    }
}))

type Props = ButtonProps & {
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | "black",
    border?: boolean
}

export const StyledButton: React.FC<Props> = (props) => {
    const styles = useStyles(props)
    return <Button {...props} className={clsx(styles.button, props.className)} />
}