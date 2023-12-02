import { createContext, useContext, useEffect, useState } from 'react';
import './App.css';
import { Alert, AlertTitle, Box, Card, CssBaseline, Slide, ThemeProvider, Typography, Zoom, createTheme } from '@mui/material';
import Layout from './layout/Layout';
import { ButtonNavigationLabel } from './constants/Constants';
import ButtonMenu from './uiparts/ButtonMenu';
import Home from './pages/Home';
import ButtonAppBar from './uiparts/ButtonAppBar';
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import { API, Amplify, Auth, graphqlOperation } from 'aws-amplify';
import { I18n } from 'aws-amplify';
import { UserProvider } from './util/UserProvider';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MeetingPlace from './pages/MeetingPlace';
import { dict } from './config/Dictionary';
import MyPage from './pages/MyPage';
import useReactionStatesList, { ReactionStates, ReactionStatesListHook } from './context/ReactionContext';
import { listReactions, listReactionsByUserId } from './graphql/queries';
import { GetUserInfo } from './util/Authenticator';
import { ReactionStatesListContext } from './AppWrapper';
import Bookmarks from './pages/Bookmarks';
import { onUpdatePostByUserId } from './graphql/subscriptions';
import ReactionedAlert from './uiparts/ReactionedAlert';
import { Observable } from 'zen-observable-ts';
import Notifications from './pages/Notifications';
import Introduction from './pages/Introduction';
import CustomAuthenticator from './pages/CustomAuthenticator';
import GuestButtonAppBar from './guestmode/GuestButtonAppBar';
import GuestHome from './guestmode/GuestHome';
import GuestNotifications from './guestmode/GuestNotifications';
import GuestBookmarks from './guestmode/GuestBookmarks';
import GuestSerach from './guestmode/GuestSearch';

Amplify.configure(awsExports);

// Cognitoの日本語化対応
I18n.putVocabularies(dict);
I18n.setLanguage('ja');

function GuestApp({onSignIn}: {onSignIn: (method: string) => void}) {
  // 画面下部のナビゲーションの状態管理
  const [currentButtonNavigation, setCurrentButtonNavigation] = useState<ButtonNavigationLabel>(ButtonNavigationLabel.Home);
  const reactionStatesListHook = useReactionStatesList();

  const theme = createTheme(
    {
      palette: {
        primary: {
          main: "#121858",
        },
        secondary: {
          main: "#FFFFFF",
        }
      }
    }
  );

  // TODO: ButtonAppBarの記述をまとめたい。
  const router = createBrowserRouter([
    {
      path: "/mypage",
      element: <>
        <GuestButtonAppBar title="EchoNor" onSignIn={onSignIn}/>
        <MyPage/>
      </>
    },
    {
      path: "/meetingplace",
      element: <>
        <GuestButtonAppBar title="EchoNor" onSignIn={onSignIn}/>
        <MeetingPlace/>
      </>
    },
    {
      path: "/",
      element: <>
        <GuestButtonAppBar title="EchoNor(Guest)" onSignIn={onSignIn}/>
        {currentButtonNavigation === ButtonNavigationLabel.Home && <GuestHome onSignIn={onSignIn}/>}
        {currentButtonNavigation === ButtonNavigationLabel.Notifications && <GuestNotifications/>}
        {currentButtonNavigation === ButtonNavigationLabel.Favorite && <GuestBookmarks/>}
        {currentButtonNavigation === ButtonNavigationLabel.Search && <GuestSerach/>}
        <ButtonMenu value={currentButtonNavigation} setValue={setCurrentButtonNavigation}/> 
      </>
    }
  ]);

  const[isUpdatedPost, setIsUpdatedPost] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect( () => {
    checkFirstTime();
  }, []);

  // 初回起動かどうかをチェックし、初回起動の場合はIntroductionを表示する
  const checkFirstTime = () => {
    const isFirstTime = localStorage.getItem('firstTime') === null;

    if (isFirstTime) {
      localStorage.setItem('firstTime', 'false'); // フラグをセット
      setIsOpen(true);
    }
  }

  const [alertContent, setAlertContent] = useState<string>("");

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className="App">
          <CssBaseline/>
          <header className="App-header">
          </header>
          <main>
            {/* AppBarとButtomNavigationの高さ分paddingを調整 */}
            <Box sx={{pt: 7, pb: 7}}>
              <Layout>
                <RouterProvider router={router} />
              </Layout>
            </Box>
          </main>
          <footer>
            
          </footer>
          <Introduction isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default GuestApp;