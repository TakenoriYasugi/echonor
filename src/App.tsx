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
import { I18n } from 'aws-amplify';
import { UserProvider } from './util/UserProvider';

Amplify.configure(awsExports);

// Cognitoの日本語化対応
const dict = {
  'ja': {
    'User does not exist.': "ユーザー名またはパスワードが正しくありません",
    'Incorrect username or password.': "ユーザー名またはパスワードが正しくありません",
    'Password did not conform with policy: Password not long enough': "パスワードが短すぎます",
    'Invalid session for the user, session is expired.': "セッションが無効です",
    'Password attempts exceeded': "パスワードを一定回数以上間違えたため、アカウントを無効にしました",
    'Account recovery requires verified contact information': "アカウントを復旧するには連絡先の確認が必要です",
    'Back to Sign In': "サインイン画面へ戻る",
    'Change Password': "パスワード変更",
    'Change': "変更",
    'Code': "確認コード",
    'Confirm a Code': "コードを確認する",
    'Confirm Sign In': "確認",
    'Confirm Sign Up': "サインアップ",
    'Confirm': "確認",
    'Email': "メールアドレス",
    'Forgot Password': "パスワードをお忘れの場合",
    'Loading...': "ロード中...",
    'New Password': "新しいパスワード",
    'No MFA': "MFAなし",
    'Password': "パスワード",
    'Phone Number': "電話番号",
    'Pick a File': "ファイルを選択する",
    'Resend a Code': "確認コードを再送する",
    'Resend Code': "確認コードを再送する",
    'Select MFA Type': "MFAタイプの選択",
    'Select your preferred MFA Type': "MFAタイプを選択してください",
    'Sign In Account': "サインイン",
    'Sign In': "サインイン",
    'Sign Out': "サインアウト",
    'Sign Up Account': "サインアップ",
    'Sign Up': "サインアップ",
    'Skip': "スキップする",
    'Submit': "保存",
    'Username': "ユーザー名",
    'Verify Contact': "確認",
    'Verify': "確認する",
    'Create Account': "アカウント作成",
    'Confirm Password': "パスワード（確認）",
    'Enter your Email': "メールアドレスを入力",
    'Enter your Password': "パスワードを入力",
    'Please confirm your Password': "パスワードを再度入力",
    'Sign in': "サインイン",
    'Forgot your password?': "パスワードをお忘れですか？",
    'Reset Password': "パスワードのリセット",
    'Enter your email': "メールアドレスを入力",
    'Send code': "コードの送信",
    'Code *': "コードの入力",
   }
};

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
        }
      }
    }
  );
  
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className="App">
          <CssBaseline/>
          <header className="App-header">
            <ButtonAppBar title="EchoNor"/>
          </header>
          <main>
            {/* AppBarとButtomNavigationの高さ分paddingを調整 */}
            <Box sx={{pt: 7, pb: 7}}>
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
      </UserProvider>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
