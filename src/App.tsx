import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, CssBaseline, Typography } from '@mui/material';
import Layout from './layout/Layout';
import Post from './uiparts/Post';
import { ButtonNavigationLabel } from './constants/Constants';
import ButtonMenu from './uiparts/ButtonMenu';
import Home from './pages/Home';



function App() {
  // 画面下部のナビゲーションの状態管理
  const [currentButtonNavigation, setCurrentButtonNavigation] = useState<ButtonNavigationLabel>(ButtonNavigationLabel.Home);
  return (
    <div className="App">
      <CssBaseline/>
      <header className="App-header">
        
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
  );
}

export default App;
