import { createContext, useState } from 'react';
import './App.css';
import { Box, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import Layout from './layout/Layout';
import { ButtonNavigationLabel } from './constants/Constants';
import ButtonMenu from './uiparts/ButtonMenu';
import Home from './pages/Home';
import ButtonAppBar from './uiparts/ButtonAppBar';
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify';
import { UserProvider } from './util/UserProvider';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MeetingPlace from './pages/MeetingPlace';
import { dict } from './config/Dictionary';
import MyPage from './pages/MyPage';
import useReactionStatesList from './context/ReactionContext';

Amplify.configure(awsExports);

// Cognitoの日本語化対応
I18n.putVocabularies(dict);
I18n.setLanguage('ja');

function App() {
  // 画面下部のナビゲーションの状態管理
  const [currentButtonNavigation, setCurrentButtonNavigation] = useState<ButtonNavigationLabel>(ButtonNavigationLabel.Home);

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
      path: "/",
      element: <>
        <ButtonAppBar title="EchoNor"/>
        {currentButtonNavigation === ButtonNavigationLabel.Home && <Home/>}
        {currentButtonNavigation === ButtonNavigationLabel.Favorite && <Typography>Favo</Typography>}
        {currentButtonNavigation === ButtonNavigationLabel.Search && <Typography>Search</Typography>}
        <ButtonMenu value={currentButtonNavigation} setValue={setCurrentButtonNavigation}/> 
      </>,
    },
    {
      path: "/mypage",
      
      element: <>
        <ButtonAppBar title="EchoNor"/>
        <MyPage/>
      </>
    },
    {
      path: "/meetingplace",
      element: <>
        <ButtonAppBar title="EchoNor"/>
        <MeetingPlace/>
      </>
    },
  ]);
  
  const ReactionStatesListContext = createContext({});

  return (
    <ReactionStatesListContext.Provider value={useReactionStatesList()}>
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
          </div>
        </UserProvider>
      </ThemeProvider>
    </ReactionStatesListContext.Provider>
  );
}

export default withAuthenticator(App);

