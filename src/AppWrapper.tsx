import { createContext, useEffect, useLayoutEffect, useState } from "react";
import useReactionStatesList, { ReactionStatesListHook } from "./context/ReactionContext";
import App from "./App";
import { GetUserInfo } from "./util/Authenticator";
import { Auth } from "aws-amplify";
import CustomAuthenticator from "./pages/CustomAuthenticator";
import GuestApp from "./GuestApp";

const defaultReactionStatesListHook: ReactionStatesListHook = {
    reactionStatesList: [],
    setReactionStatesList: () => {}
};

export const ReactionStatesListContext = createContext<ReactionStatesListHook>(defaultReactionStatesListHook);

const AppWrapper = () => {
    
    const reactionStatesListHook = useReactionStatesList();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState();
    const [isGuest, setIsGuest] = useState<boolean>(false);

    useLayoutEffect(() => {
        GetUserInfo().then((userInfo) => {
            setUser(userInfo);
            setIsAuthenticated(true);
        }).catch((error) => {
            setIsAuthenticated(false);
        });
    }, []);

    
    // ログイン状態を確認し、未ログインの場合はログイン選択画面を表示する
    const handleSignIn = (method: string) => {
        if (method === 'login') {
            // Cognitoのログインページへリダイレクトする
            console.log("ログインページへリダイレクト");
            setIsGuest(false);
            setIsAuthenticated(true);
        } else {
            // ゲストとして続ける処理
            console.log("ゲストとして続ける");
            setIsGuest(true);
            setIsAuthenticated(true);
        }
    }

    if (!isAuthenticated) {
        console.log("未ログイン")
        return <CustomAuthenticator onSignIn={handleSignIn} />; 
    } else {
        if (isGuest) {
            return <GuestApp onSignIn={handleSignIn}/>;
        } else {
            return (
                <ReactionStatesListContext.Provider value={reactionStatesListHook}>
                    <App/>
                </ReactionStatesListContext.Provider>
            );
        }
    }

}

export default AppWrapper;