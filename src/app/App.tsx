import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from "react-router-dom"

import { Layout } from '../containers/Layout'
import { Pages } from '../pages'
import { EtheriumProvider } from '../hooks/useEtherium'
import { AlertProvider } from '../hooks/useAlert'
import PixeloidTtf from '../assets/PixeloidSans-Regular.ttf'

export const theme = createTheme({
    palette: {
        primary: {
            main: "#CD0067"
        },
        secondary: {
            main: "#999999"
        },
    },
    typography: {
        fontFamily: [
            'Pixeloid',
        ].join(' '),
        fontWeightMedium: 550,
        fontSize: 20,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "hsla(0, 0%, 0%, 0.8)",
                }
            }
        }
    }
})

export const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <AlertProvider>
                    <EtheriumProvider>
                        <Layout>
                            <Pages />
                        </Layout>
                    </EtheriumProvider>
                </AlertProvider>
            </ThemeProvider>
        </BrowserRouter>

    )
}
