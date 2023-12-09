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
import { onCreateReactionByUserId, onUpdatePostByUserId, onUpdateReaction, onUpdateReactionByUserId } from './graphql/subscriptions';
import ReactionedAlert from './uiparts/ReactionedAlert';
import { Observable } from 'zen-observable-ts';
import Notifications from './pages/Notifications';
import Introduction from './pages/Introduction';
import CustomAuthenticator from './pages/CustomAuthenticator';
import Search from './pages/Search';
import Licenses from './pages/Licenses';

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
        {currentButtonNavigation === ButtonNavigationLabel.Notifications && <Notifications/>}
        {currentButtonNavigation === ButtonNavigationLabel.Favorite && <Bookmarks/>}
        {currentButtonNavigation === ButtonNavigationLabel.Search && <Search/>}
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
    {
      path: "/licenses",
      element: <>
        <ButtonAppBar title="EchoNor"/>
        <Licenses/>
      </>
    },
    // {
    //   path: "/dummypage",
    //   element: <>
    //     <ButtonAppBar title="EchoNor"/>
    //     {currentButtonNavigation === ButtonNavigationLabel.Home && <DummyPage/>}
    //     {currentButtonNavigation === ButtonNavigationLabel.Notifications && <Notifications/>}
    //     {currentButtonNavigation === ButtonNavigationLabel.Favorite && <Bookmarks/>}
    //     {currentButtonNavigation === ButtonNavigationLabel.Search && <Typography>Search</Typography>}
    //     <ButtonMenu value={currentButtonNavigation} setValue={setCurrentButtonNavigation}/> 
    //   </>
    // }
  ]);

  const [user, setUser] = useState();

  const[isUpdatedPost, setIsUpdatedPost] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect( () => {
    let subscription: ZenObservable.Subscription[] = [];
    
    GetUserInfo().then((user) => {
      setUser(user);
      // @ts-ignore
      fetchReactionStatesList(user.username);
      subscribePostUpdate(user.username).then((sub) => {
        subscription[0] = sub;
      });
      subscribeUpdateReactionStates(user.username).then((sub) => {
        subscription[1] = sub;
      });
      subscribeCreateReactionStates(user.username).then((sub) => {
        subscription[2] = sub;
      });
    }).catch((error) => {
      console.log("GetUserInfo error", error);
    });

    checkFirstTime();

    return () => {
      if (subscription) {
        subscription.map((sub: ZenObservable.Subscription) => {
          sub.unsubscribe();
        });
      }
    }
  }, []);

  // 初回起動かどうかをチェックし、初回起動の場合はIntroductionを表示する
  const checkFirstTime = () => {
    const isFirstTime = localStorage.getItem('firstTime') === null;

    if (isFirstTime) {
      localStorage.setItem('firstTime', 'false'); // フラグをセット
      setIsOpen(true);
    }
  }

  const subscribePostUpdate = async (userId: string) : Promise<ZenObservable.Subscription> => {
    return API.graphql(
      graphqlOperation(onUpdatePostByUserId, { userId: userId })
      // @ts-ignore
    ).subscribe({
      next: (data: any) => {
        console.log('Post updated:', data);
        appearAlert(data.value.data.onUpdatePost.content);
      },
      error: (error: any) => {
        console.error('Error with subscription:', error);
      },
    }) as ZenObservable.Subscription;
  }


  const [alertContent, setAlertContent] = useState<string>("");
  // 通知用のAlertを表示する。５秒間表示し、その後非表示にする。
  const appearAlert = (content: string) => {
    setAlertContent(content);
    setIsUpdatedPost(true);
    setTimeout(() => {
      setIsUpdatedPost(false);
     },
      3000
    );
  }

  const fetchReactionStatesList = async (userId: string) => {
    try {
      const reactionData = await API.graphql(graphqlOperation(listReactionsByUserId, {userId}));

      var tempReactionStatesList: ReactionStates[] = [];
      // @ts-ignore
      reactionData.data.listReactions.items.map((reaction) => {
        tempReactionStatesList = [...tempReactionStatesList, {
          id: reaction.id,
          postId: reaction.postId,
          states: reaction.reactionStates
        }]
      })

      console.log("-- fetchReactionStatesList tempReactionStatesList --");
      console.log(tempReactionStatesList);

      // ローカルストレージにtempReactionStatesListを保存
      localStorage.setItem('reactionStatesList', JSON.stringify(tempReactionStatesList));
    } catch (err) {
      console.error('Error fetching reaction states', err);
    }
  }

  const updateLocalReactionStatesList = (data: ReactionStates) => {

    // ローカルストレージからreactionStatesListを取得
    const localReactionStatesList: ReactionStates[] = JSON.parse(localStorage.getItem('reactionStatesList') || '[]');
    const isExists = localReactionStatesList.some((reactionStates) => reactionStates.postId === data.postId);

    if (isExists) {
      const newReactionStatesList: ReactionStates[] = localReactionStatesList.map((reactionStates) => {
        if (reactionStates.postId === data.postId) {
          return data;
        } else {
          return reactionStates;
        }
      });
      localStorage.setItem('reactionStatesList', JSON.stringify(newReactionStatesList));
    } else {
      const newReactionStatesList: ReactionStates[] = [...localReactionStatesList, data];
      localStorage.setItem('reactionStatesList', JSON.stringify(newReactionStatesList));
    }
  }

  const subscribeUpdateReactionStates = async (userId: string) : Promise<ZenObservable.Subscription> => {
    return API.graphql(
      graphqlOperation(onUpdateReactionByUserId, { userId: userId })
      // @ts-ignore
    ).subscribe({
      next: (data: any) => {
        console.log('Reaction updated:', data);
        const newReactionStates: ReactionStates = data.value.data.onUpdateReaction;
        
        updateLocalReactionStatesList(newReactionStates);
      },
      error: (error: any) => {
        console.error('Error with subscription:', error);
      },
    }) as ZenObservable.Subscription;
  }

  const subscribeCreateReactionStates  = async (userId: string) : Promise<ZenObservable.Subscription> => {
    return API.graphql(
      graphqlOperation(onCreateReactionByUserId, { userId: userId })
      // @ts-ignore
    ).subscribe({
      next: (data: any) => {
        console.log('Reaction created:', data);
        const newReactionStates: ReactionStates = data.value.data.onCreateReaction;
        updateLocalReactionStatesList(newReactionStates);
      },
      error: (error: any) => {
        console.error('Error with subscription:', error);
      },
    }) as ZenObservable.Subscription;
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
                  <Slide direction="down" in={isUpdatedPost} mountOnEnter unmountOnExit>
                    <div style={{ position: "fixed", top: 50, left: 0, right: 0, zIndex: 999 }}>
                      <Alert severity="info">
                          <AlertTitle>リアクションされました！</AlertTitle>
                          以下の投稿にリアクションがありました
                          <Box sx={{m: 1, borderRadius: "10px", backgroundColor: "#FFFFFF"}}>
                            <Typography variant="body2" fontSize={12} sx={{p: 1}}>
                              {alertContent}
                            </Typography>
                          </Box>
                      </Alert>
                    </div>
                  </Slide>
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

export default withAuthenticator(App);

