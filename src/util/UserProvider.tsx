import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

// UserContextの型を定義
interface UserContextType {
  user: CognitoUser | null;
}

// UserContextの初期値を設定（nullまたは適切な初期値）
const UserContext = createContext<UserContextType>({ user: null });

// UserProviderのProps型を定義
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider コンポーネント
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(userData => setUser(userData))
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// カスタムフック
export const useUser = () => useContext(UserContext);
