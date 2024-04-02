import { PaletteColor, SimplePaletteColorOptions, createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface TypeBackground {
        secondary: string;
    }

    interface TypeText {
        dark: string;
        main: string;
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        accent: PaletteColor;
    }
    interface PaletteOptions {
        accent: SimplePaletteColorOptions;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        text: true;
    }
}

declare module '@mui/material/AccordionSummary' {
    interface AccordionSummaryColorOverrides {
        accent: true;
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        accent: true;
    }
}

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#c10000',
            light: '#241818'
        },
        secondary: {
            main: '#c4c4c4'
        },
        accent: {
            main: '#99ff66',
            light: '#465c2f'
        },
        background: {
            default: '#1a1a1a',
            'secondary': '#2b2b2b'
        },
        text: {
            primary: '#ffffff',
            secondary: '#c4c4c4',
            disabled: '#7f7f7f',
            dark: '#000000',
            main: '#ffffff'
        }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                text: {
                    color: '#ffffff',
                    '&:hover': {
                        color: '#c10000',
                        backgroundColor: 'transparent'
                    },
                }
            }
        },
        MuiTypography: {
            defaultProps: {
                lineHeight: 1.5,
                letterSpacing: '.08rem'
            }
        }
    }
})

export default customTheme