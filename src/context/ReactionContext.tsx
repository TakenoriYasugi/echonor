import { useState } from "react";

export type ReactionStates = {
    id: string,
    postId: string,
    states: IsReactionedStates
}

export type IsReactionedStates = {
    good: boolean,
    heart: boolean,
    smile: boolean,
    sad: boolean,
    bad: boolean,
    bookmark: boolean
}

export type ReactionStatesListHook = {
    reactionStatesList: ReactionStates[];
    setReactionStatesList: React.Dispatch<React.SetStateAction<ReactionStates[]>>;
}

const useReactionStatesList = () => {
    const [reactionStatesList, setReactionStatesList] = useState<ReactionStates[]>([] as ReactionStates[]);
    return {reactionStatesList, setReactionStatesList};
}

export default useReactionStatesList;