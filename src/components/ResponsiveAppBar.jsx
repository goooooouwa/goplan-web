import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TaskAlt from '@mui/icons-material/TaskAlt';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import httpService from 'services/httpService';
import { Avatar, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useAPIError } from 'hooks/useAPIError';
import { useTranslation } from 'react-i18next';

const ResponsiveAppBar = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const pages = [
    {
      title: t('Goals'),
      url: '/projects'
    },
    {
      title: t('Tasks'),
      url: '/todos'
    },
    {
      title: t('Timeline'),
      url: '/timeline/week'
    },
  ];
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
  const { addError } = useAPIError();

  useEffect(() => {
    httpService.get('/me.json')
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  }, [addError]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    httpService.logout(() => {
      navigate("/goodbye");
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <TaskAlt sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {t('GoPlan')}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  component={RouterLink}
                  to={page.url}
                  key={page.title}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {localStorage.getItem("offlineMode") === 'true' &&
              <Typography textAlign="center" sx={{ mr: 1 }}>Offline</Typography>
            }
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={user.name || ''}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={`${user.name}`} src={user.imageUrl} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {localStorage.getItem("access_token") !== null &&
                  <MenuItem component={RouterLink} to='/account' onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{t('Account')}</Typography>
                  </MenuItem>
                }
                {localStorage.getItem("access_token") !== null &&
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">{t('Logout')}</Typography>
                  </MenuItem>
                }
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Empty toolbar to fix some part of content to be invisible caused by fixed position AppBar
      Ref: https://mui.com/material-ui/react-app-bar/#fixed-placement */}
      <Toolbar />
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Toolbar sx={{
              bgcolor: 'primary.main',
              display: 'felx',
              justifyContent: 'center',
            }}>
              <TaskAlt sx={{
                mr: 1,
                color: 'white',
              }} />
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {t('GoPlan')}
              </Typography>
            </Toolbar>
            <Divider />
            <List>
              {pages.map((page) => (
                <ListItem key={page.title} disablePadding>
                  <ListItemButton component={RouterLink} to={page.url} sx={{ textAlign: 'center' }}>
                    <ListItemText primary={page.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
    </>
  );
};
export default ResponsiveAppBar;
