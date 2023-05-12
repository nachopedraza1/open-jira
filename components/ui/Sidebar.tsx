import { useContext } from 'react';

import { UiContext } from '@/context/ui';

import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {

    const { sideMenuOpen, closeSideBar } = useContext(UiContext)

    return (
        <Drawer
            anchor="left"
            open={sideMenuOpen}
            onClose={closeSideBar}
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4"> Menu </Typography>
                </Box>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItemButton key={text}>
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Box>

        </Drawer>
    )
}
