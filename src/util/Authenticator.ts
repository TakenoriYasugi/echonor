import { Auth } from 'aws-amplify';

/// ログイン済みかどうかを返却する関数
/// 使用例
// checkUserLoggedIn().then(isLoggedIn => {
//     if (isLoggedIn) {
//       // ユーザーはログイン済みの処理
//     } else {
//       // ユーザーはログインしていない処理
//     }
//   });
export const CheckUserLoggedIn = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return true; // ユーザーはログイン済み
  } catch (error) {
    console.log(error);
    return false; // ユーザーはログインしていない
  }
};

export const GetUserInfo = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user; // ユーザーはログイン済み
  } catch (error) {
    console.log(error);
    return false; // ユーザーはログインしていない
  }
};

export const Logout = async () => {
  try {
    await Auth.signOut();
    console.log('ログアウト成功！');
    // ログアウト後の処理（例えば、ログインページへのリダイレクトなど）
  } catch (error) {
    console.error('ログアウト中にエラーが発生しました', error);
  }
};


