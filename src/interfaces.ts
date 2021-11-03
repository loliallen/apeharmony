import { PaletteColor, Theme } from "@mui/material";

export type ModTheme = Theme & {
    palette: Record<string, PaletteColor>
}