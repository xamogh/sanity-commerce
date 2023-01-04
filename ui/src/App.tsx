import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: "Poppins",
            textTransform: "none",
            fontSize: 16,
        },
    },
});

function App() {
    return (
        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </SnackbarProvider>
    );
}

export default App;
