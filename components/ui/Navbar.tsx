import { useContext } from 'react';

import { UiContext } from '@/context/ui';

import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {

    const { openSideBar } = useContext(UiContext);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" onClick={openSideBar}>
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6"> OpenJira </Typography>
            </Toolbar>
        </AppBar>
    )
}
