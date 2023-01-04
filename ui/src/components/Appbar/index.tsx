import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export const WithAppBar = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Store
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Home
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box mt="64px">{children}</Box>
        </Box>
    );
};
