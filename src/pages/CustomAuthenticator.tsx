import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";

// カスタム認証コンポーネント
// 未ログイン時に表示されるコンポーネント
const CustomAuthenticator = ({onSignIn}: {onSignIn: (method: string) => void}) => {
    return (
        <div>
            <button onClick={() => onSignIn('guest')}>ゲストとして続ける</button>
            <button onClick={() => onSignIn('login')}>ログイン</button>
        </div>
    );
};

export default CustomAuthenticator;
  
//   function App() {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//     useEffect(() => {
//       // ユーザー認証状態の確認
//       checkUser();
//     }, []);
  
//     const checkUser = async () => {
//       try {
//         const currentUser = await Auth.currentAuthenticatedUser();
//         setUser(currentUser);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.log('ユーザーは未ログインです。');
//       }
//     };
  
//     const handleSignIn = (method: string) => {
//       if (method === 'login') {
//         // ログインページへリダイレクト等の処理
//       } else {
//         // ゲストとして続ける処理
//         setIsAuthenticated(true);
//       }
//     };
  
//     if (!isAuthenticated) {
//       return <CustomAuthenticator onSignIn={handleSignIn} />;
//     }
  
//     // 以下、アプリケーションのメインコンテンツ
//     return (
//       // ...
//     );
//   }
  
//   export default App;
  