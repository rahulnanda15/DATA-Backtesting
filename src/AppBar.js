import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import dataLogo from './data_logo.jpeg';
import CircularProgress, {
    circularProgressClasses,
  } from '@mui/material/CircularProgress';
//import AdbIcon from '@mui/icons-material/Adb';


function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  /*
  Under typography: 
   <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Custom Icon" src="/data_logo.jpeg" />
            </IconButton>
        </Tooltip>
        
    </Box>
  */
  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '2px solid #9f56b8' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{
            height: '100px'
        }}>
          <img 
            src={dataLogo}
            style={{ height: '40px'}}
          ></img>
          <Typography
            variant="h6"
            noWrap
            component="a"
            //href="#app-bar-with-responsive-menu"
            sx={{
              ml: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'BlinkMacSystemFont',
              fontWeight: 500,
              letterSpacing: '0rem',
              color: '#9f56b8',
              textDecoration: 'none'
            }}
          >
            Treowo Backtesting Application
          </Typography>
          
          {!props.doneLoading &&
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={(theme) => ({
                color: '#1a90ff',
                animationDuration: '750ms',
                position: 'absolute',
                right: 0,
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                },
                ...theme.applyStyles('dark', {
                    color: '#308fe8',
                }),
                })}
                size={40}
                thickness={4}
            />
          }
          

         
         
         
          
         
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;