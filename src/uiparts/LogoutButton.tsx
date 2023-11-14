import React from 'react';
import { Auth } from 'aws-amplify';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      console.log('ログアウト成功！');
      // ログアウト後の処理
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました', error);
    }
  };

  return <Button onClick={handleLogout} variant="contained">ログアウト</Button>;
};

export default LogoutButton;
