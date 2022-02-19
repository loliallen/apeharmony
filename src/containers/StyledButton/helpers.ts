import { ButtonProps, Theme } from "@material-ui/core";

type ModTheme = Theme & {
    palette: Record<string, any>
}
export const getPaletteColor = (theme: ModTheme, color?: ButtonProps['color']) => {
    if (!color)
        return theme.palette.primary.main
    if (color === "inherit")
        return "#000000"
    return theme.palette[color].main
}