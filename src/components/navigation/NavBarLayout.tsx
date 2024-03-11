import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { logoImg } from '../../assets/index';
import { NavBar } from './NavBar';

export type MainLayoutProps = {};

export const NavBarLayout = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    return (
    <Box>
        <AppBar position="fixed" sx={{ backgroundColor: "#D7D2CB" }}>
        <Toolbar>
            <Box flexGrow={1}>
            <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }}>
                <img width="54px" height="54px" src={logoImg} alt="logo" />
                <Typography variant="h5" sx={{ width: 'fit-content' }}>Omega Point</Typography>
            </Box>
            </Box>
            
            <NavBar isSmall={isSmall} />
        </Toolbar>
        </AppBar>
        
        <Toolbar />
        
        
    </Box>
    );
};

export default NavBarLayout;