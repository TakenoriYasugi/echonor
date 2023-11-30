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
import { Info, Logout } from '@mui/icons-material';
import LogoutButton from './LogoutButton';
import { Avatar, Card, CardActionArea, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import echonorLogo from '../images/echonor_logo_resize_comp.png'
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Introduction from '../pages/Introduction';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ButtonAppBar = ({title}: {title: string}) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [isIntroductionOpen, setIsIntroductionOpen] = useState<boolean>(false);

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
    {text: "サポート", url: "https://ysfactoryportal.com/contact/"},
  ]

  const navigate = useNavigate();

  const handleLinkClick = (url: string) => {
    if (url.startsWith("http")) {
      window.open(url, '_blank');
      return;
    }
    navigate(url);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isInfoOpen = Boolean(anchorEl);
  const id = isInfoOpen ? 'info-popover' : undefined;

  const handleInfoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <>
      <Box sx={{p: 2}}>
        <img src={echonorLogo} style={{ width: '100%', height: '100%' }} />
      </Box>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <List>
          <ListItem key={"userId"}>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleLinkClick("/mypage")}>
              <Typography fontSize={12} textAlign={'center'} sx={{m: 'auto'}}>
                {userEmail}
              </Typography>
            </ListItemButton>
          </ListItem>
          
          <Divider />
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleLinkClick(item.url)}>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
            </ListItem>
          ))}
          <ListItem key={"introduction"} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => {setIsIntroductionOpen(true)}}>
                  <ListItemText primary={"使い方ガイド"}/>
                </ListItemButton>
            </ListItem>
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
            <IconButton onClick={handleInfoClick}>
              <InfoOutlinedIcon fontSize="large" color="info"/>
            </IconButton>
            <Button sx={{textTransform: 'none'}} color='secondary' variant='outlined' onClick={() => handleLinkClick("/mypage")}>MyPage</Button>
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
      <Introduction isOpen={isIntroductionOpen} setIsOpen={setIsIntroductionOpen}/>
      
      {/* お知らせ表示用ポップアップ */}
      <Popover
        id={id}
        open={isInfoOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleInfoClose}>
        <Card sx={{ maxWidth: 345, p: 2}}>
          <CardActionArea onClick={() => handleLinkClick("https://ysfactoryportal.com/contact/")}>
            <Typography gutterBottom variant="h5" component="div">
              お知らせ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              本サービスはβ版です。ご利用の際は、<a href="https://ysfactoryportal.com/contact/">お問い合わせ</a>よりご連絡ください。
            </Typography>
          </CardActionArea>
        </Card>
      </Popover>
    </>
  );
}

export default ButtonAppBar;