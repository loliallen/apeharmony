import {createTheme} from "@material-ui/core";


const defaultTheme = createTheme()

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
        h6: {
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: "1.3rem"
            }
        }
    },
    overrides: {
        MuiTypography: {
            root: {
                color: "white"
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: "hsla(0, 0%, 0%, 0.8)",
            }
        },
        MuiButton: {
            root: {
                ":disabled": {
                    backgroundColor: "hsla(330, 66%, 40%, 1)",
                    color: "hsla(0, 0%, 82%, 1)",
                }
            }
        },
        MuiTextField: {
            root: {
                '& input': {
                    color: "white"
                },
                '& textarea': {
                    color: "white"
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'whitesmoke',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                },
            },
        }
    }
})
