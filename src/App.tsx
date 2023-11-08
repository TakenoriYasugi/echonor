import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CssBaseline, Typography } from '@mui/material';
import Layout from './layout/Layout';

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <header className="App-header">
        <Layout>
          <Typography>test</Typography>
          aaaa
        </Layout>
      </header>
    </div>
  );
}

export default App;
