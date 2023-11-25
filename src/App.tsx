import { createContext, useContext, useEffect, useState } from 'react';
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
import { API, Amplify, graphqlOperation } from 'aws-amplify';
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

Amplify.configure(awsExports);

// Cognitoの日本語化対応
I18n.putVocabularies(dict);
I18n.setLanguage('ja');

function App() {
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

  const [user, setUser] = useState();

  useEffect( () => {
    GetUserInfo().then((user) => {
      setUser(user);
      // @ts-ignore
      fetchReactionStatesList(user.username);
    });
  }, []);

  const reactions = useContext(ReactionStatesListContext);

  useEffect( () => {
    console.log("---- context updated ----");
    console.log(reactions.reactionStatesList);
  }, [reactions.reactionStatesList])

  const fetchReactionStatesList = async (userId: string) => {
    try {
      const reactionData = await API.graphql(graphqlOperation(listReactionsByUserId, {userId}));
      console.log("-- reactionData.data.listReactions.items --");
      // @ts-ignore
      console.log(reactionData.data.listReactions.items)

      var tempReactionStatesList: ReactionStates[] = [];
      // @ts-ignore
      reactionData.data.listReactions.items.map((reaction) => {
        tempReactionStatesList = [...tempReactionStatesList, {
          id: reaction.id,
          postId: reaction.postId,
          states: reaction.reactionStates
        }]
      })
      
      console.log("-- tempReactionStatesList  --");
      console.log(tempReactionStatesList);
      
      // @ts-ignore
      reactions.setReactionStatesList(tempReactionStatesList);

      console.log("-- fetched context -- ");
      console.log(reactions.reactionStatesList)
      
    } catch (err) {
      console.error('Error fetching reaction states', err);
    }
  }
  
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
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);

