import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useEffect, useState } from 'react';
import { CheckUserLoggedIn, GetUserInfo } from '../util/Authenticator';
import { Logout } from '@mui/icons-material';
import LogoutButton from './LogoutButton';
import { Avatar, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import echonorLogo from '../images/echonor_logo_resize_comp.png'
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ButtonAppBar = ({title}: {title: string}) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect( () => {
    let isMounted = true; // マウント状態を追跡するフラグ
    CheckUserLoggedIn().then(isLoggedIn => isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false));

    return () => {
      isMounted = false; // アンマウント時にフラグを変更
    };
  }, []);

  const [userEmail, setUserEmail] = useState("");

  useEffect( () => {
    const user = GetUserInfo().then((user) => {
      setUserEmail(user.attributes.email)
    })
  }, [])

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerWidth = 240;

  interface NavItem {
    text: string,
    url: string,
  }

  const navItems: NavItem[] = [
    {text: "ホーム", url: "/"},
    {text: "集会場", url: "/meetingplace"},
    {text: "利用規約", url: "/"},
    {text: "サポート", url: "/"},
  ]

  const navigate = useNavigate();

  const handleLinkClick = (url: string) => {
    navigate(url);
  }

  const drawer = (
    <>
      <Box sx={{p: 2}}>
        <img src={echonorLogo} style={{ width: '100%', height: '100%' }} />
      </Box>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography fontSize={15} sx={{ my: 2 }}>
          {userEmail}
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleLinkClick(item.url)}>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
            </ListItem>
          ))}
        </List>
        {isLoggedIn ? <LogoutButton/> : <Button variant="contained">Login</Button>}
      </Box>
    </>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Button variant='contained' onClick={() => handleLinkClick("/profile")}>プロフィール</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default ButtonAppBar;