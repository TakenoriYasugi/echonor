import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import Layout from './layout/Layout';
import Post from './uiparts/Post';
import { ButtonNavigationLabel } from './constants/Constants';
import ButtonMenu from './uiparts/ButtonMenu';
import Home from './pages/Home';
import ButtonAppBar from './uiparts/ButtonAppBar';
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import { Amplify } from 'aws-amplify';
Amplify.configure(awsExports);


function App() {
  // 画面下部のナビゲーションの状態管理
  const [currentButtonNavigation, setCurrentButtonNavigation] = useState<ButtonNavigationLabel>(ButtonNavigationLabel.Home);
  
  const theme = createTheme(
    {
      palette: {
        primary: {
          main: "#121858",
        }
      }
    }
  );
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline/>
        <header className="App-header">
          <ButtonAppBar title="EchoNor"/>
        </header>
        <main>
          {/* AppBarの高さ分paddingを調整 */}
          <Box sx={{pt: 7}}>
            <Layout>
              {currentButtonNavigation === ButtonNavigationLabel.Home && <Home/>}
              {currentButtonNavigation === ButtonNavigationLabel.Favorite && <Typography>Favo</Typography>}
              {currentButtonNavigation === ButtonNavigationLabel.Search && <Typography>Search</Typography>}
            </Layout>
          </Box>
        </main>
        <footer>
          <ButtonMenu value={currentButtonNavigation} setValue={setCurrentButtonNavigation}/> 
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
