import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import Layout from './layout/Layout';
import Post from './uiparts/Post';
import { ButtonNavigationLabel } from './constants/Constants';
import ButtonMenu from './uiparts/ButtonMenu';
import Home from './pages/Home';
import ButtonAppBar from './uiparts/ButtonAppBar';



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
          <ButtonAppBar/>
        </header>
        <main>
          <Layout>
            {currentButtonNavigation === ButtonNavigationLabel.Home && <Home/>}
            {currentButtonNavigation === ButtonNavigationLabel.Favorite && <Typography>Favo</Typography>}
            {currentButtonNavigation === ButtonNavigationLabel.Search && <Typography>Search</Typography>}
          </Layout>
        </main>
        <footer>
          <ButtonMenu value={currentButtonNavigation} setValue={setCurrentButtonNavigation}/> 
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
