import React, { useState } from "react";
import "../../App.css";
import { Close, Menu } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Hidden,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

export type NavigationProps = {
  isSmall: boolean;
};

const navigationItems = [
  {
    text: 'Roadmap',
    href: 'roadmap',
  },
  {
    text: 'Profile',
    href: 'profile', 
  },
  {
    text: 'Dashboard',
    href: 'dashboard',
  },
];

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const NavBar: React.FC<NavigationProps> = ({ isSmall }) => {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => setOpen(true);
  const onCloseHandler = () => setOpen(false);

  const mappedItems = (
    navigationItems.map(({ text, href }) => { 
      return (
        <Button key={href} href={href} color="inherit" size="large" fullWidth={isSmall} onClick={onCloseHandler}>
          {text}
        </Button>
      );
    })
  );

  return (
    <>
      <Hidden smDown>
        <Box display="flex" gap={2}>
          {mappedItems}
        </Box>
      </Hidden>
      <Hidden smUp>
        <IconButton color="inherit" onClick={onOpenHandler}>
          <Menu />
        </IconButton>
        <Dialog
          open={open}
          fullScreen
          fullWidth
          TransitionComponent={Transition}
          hideBackdrop
          PaperProps={{
            sx: {
              boxShadow: 'none',
            },
          }}
        >
          <AppBar position="static" sx={{ backgroundColor: "#D7D2CB", color: 'text.primary' }}>
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Menu
              </Typography>
              <IconButton color="inherit" onClick={onCloseHandler}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box display="flex" flexDirection="column" py={3} width="100%">
            {mappedItems}
          </Box>
        </Dialog>
      </Hidden>
    </>
  );
};