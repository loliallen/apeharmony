import { ButtonProps, PaletteColor, Theme } from "@mui/material";

type ModTheme = Theme & {
    palette: Record<string, PaletteColor>
}
export const getPaletteColor = (theme: ModTheme, color?: ButtonProps['color']) => {
    if (!color)
        return theme.palette.primary.main
    if (color === "inherit")
        return "#000000"
    return theme.palette[color].main
}