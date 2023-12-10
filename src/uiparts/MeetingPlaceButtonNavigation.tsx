import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ButtonNavigationLabel } from '../constants/Constants';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// 集会場で使用するナビゲーション
const MeetingPlaceButtonNavigation = ({value, setValue}: {value: ButtonNavigationLabel, setValue: React.Dispatch<React.SetStateAction<ButtonNavigationLabel>>}) => {

  const handleChange = (event: React.SyntheticEvent, newValue: ButtonNavigationLabel) => {
    setValue(newValue);
  };

  const style = {
    width: "100%",
    position: "fixed",
    left: 0,
    bottom: 0,
  }

  return (
    <>
      <BottomNavigation sx={style} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value={ButtonNavigationLabel.Home}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Notifications"
          value={ButtonNavigationLabel.Notifications}
          icon={<NotificationsActiveIcon />}
        />
        <BottomNavigationAction
          label="Search"
          value={ButtonNavigationLabel.Search}
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Bookmarks"
          value={ButtonNavigationLabel.Favorite}
          icon={<BookmarksIcon />}
        />
        
      </BottomNavigation>
    </>
  );
}

export default MeetingPlaceButtonNavigation;
