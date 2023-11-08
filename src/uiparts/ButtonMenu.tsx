import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { TypeFormatFlags } from 'typescript';
import { Typography } from '@mui/material';

const LabelBottomNavigation = () => {
  const [currentButtonNavigation, setCurrentButtonNavigation] = React.useState('home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentButtonNavigation(newValue);
  };

  const style = {
    width: "100%",
    position: "fixed",
    left: 0,
    bottom: 0,
  }

  return (
    <>
      <BottomNavigation sx={style} value={currentButtonNavigation} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon />}
        />
        
      </BottomNavigation>
    </>
  );
}

export default LabelBottomNavigation;
