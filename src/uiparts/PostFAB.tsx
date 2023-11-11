import { Fab } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

const PostFAB = () => {
    return (
        <>
            <Fab color="primary" aria-label="add">
                <ChatIcon />
            </Fab>
      </>
    );
}

export default PostFAB;