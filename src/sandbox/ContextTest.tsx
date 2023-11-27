import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { IsReactionedStates } from "../context/ReactionContext";
import { ReactionStatesListContext } from "../AppWrapper";

const ContextTest = () => {

    const reactions = useContext(ReactionStatesListContext);

    const createIsReactionedStates = () : IsReactionedStates => {
        const states = {
            good: true,
            heart: true,
            smile: true,
            sad: true,
            bad: true,
            bookmark: true
        } as IsReactionedStates;

        return states;
    }
    
    return (<>
        <Box>
            <Typography>Context Test</Typography>
            {reactions.reactionStatesList.map( (reaction) => (
                <Typography>{reaction.postId}</Typography>
            ))}
        </Box>

        <Box>
            <Button onClick={() => {
                // reactions.setReactionStatesList([...reactions.reactionStatesList, {postId: "asdfas", states: createIsReactionedStates()}]);
            }}>Add Context</Button>
        </Box>
    </>);
}

export default ContextTest;