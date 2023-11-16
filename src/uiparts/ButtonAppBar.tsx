import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useEffect, useState } from 'react';
import { CheckUserLoggedIn } from '../util/Authenticator';
import { Logout } from '@mui/icons-material';
import LogoutButton from './LogoutButton';

const ButtonAppBar = ({title}: {title: string}) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect( () => {
    let isMounted = true; // マウント状態を追跡するフラグ
    CheckUserLoggedIn().then(isLoggedIn => isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false));

    return () => {
      isMounted = false; // アンマウント時にフラグを変更
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {isLoggedIn ? <LogoutButton/> : <Button variant="contained">Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;