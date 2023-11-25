import { useState } from "react";

const useReactionStatesList = () => {
    const [reactionStatesList, setReactionStatesList] = useState();
    
    return {reactionStatesList, setReactionStatesList};
}

export default useReactionStatesList;