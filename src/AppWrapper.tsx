import { createContext } from "react";
import useReactionStatesList, { ReactionStatesListHook } from "./context/ReactionContext";
import App from "./App";

const defaultReactionStatesListHook: ReactionStatesListHook = {
    reactionStatesList: [],
    setReactionStatesList: () => {}
};

export const ReactionStatesListContext = createContext<ReactionStatesListHook>(defaultReactionStatesListHook);

const AppWrapper = () => {
      
    const reactionStatesListHook = useReactionStatesList();

    return (
        <ReactionStatesListContext.Provider value={reactionStatesListHook}>
            <App/>
        </ReactionStatesListContext.Provider>
    );
}

export default AppWrapper;