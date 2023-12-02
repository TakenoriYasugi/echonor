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
import { Avatar, Badge, Card, CardActionArea, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import echonorLogo from '../images/echonor_logo_resize_comp.png'
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Introduction from '../pages/Introduction';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Informations from '../informations/Informations';
import { informationsData } from '../informations/informationsData';
import InformationBadgeComponent from '../uiparts/InformationBadge';
import GuestButton, { GuestButtonType } from './GuestButton';

const GuestButtonAppBar = ({title, onSignIn}: {title: string, onSignIn: (method: string) => void}) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [isIntroductionOpen, setIsIntroductionOpen] = useState<boolean>(false);

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
    localStorage.setItem("lastInfoCheck", informationsData.length.toString());
    setAnchorEl(event.currentTarget);
    CheckIsInfoUpdated();
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
            <Typography fontSize={12} textAlign={'center'} sx={{m: 'auto'}}>
              Guest User
            </Typography>
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
        <Button variant="contained" onClick={() => onSignIn('login')}>Login</Button>
      </Box>
    </>
  );

  const [isInfoUpdated, setIsInfoUpdated] = useState<boolean>(false);

  // 前回お知らせ欄を開いた時のコンテンツ数で判定する
  const CheckIsInfoUpdated = () => {
    // numberに変換して比較する
      const lastInfoCheck = localStorage.getItem("lastInfoCheck") === null ? null : Number(localStorage.getItem("lastInfoCheck"));
      const lastInfoUpdate = informationsData.length;
      
      setIsInfoUpdated(lastInfoCheck === null || lastInfoCheck < lastInfoUpdate);
  }

  useEffect(() => {
      CheckIsInfoUpdated();
  }, []);

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
                <InformationBadgeComponent isInfoUpdated={isInfoUpdated}>
                  <InfoOutlinedIcon fontSize="large" color="info"/>
                </InformationBadgeComponent>
              </IconButton>
            <GuestButton type={GuestButtonType.MyPage} onSignIn={onSignIn}/>              
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
        <Informations/>
      </Popover>
    </>
  );
}

export default GuestButtonAppBar;