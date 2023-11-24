import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Fab, Stack, TextField } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost } from '../graphql/mutations';
import { useUser } from '../util/UserProvider';
import { PostSchema } from '../varidations/VaridationSchema';

const PostFAB = ({fetchPosts}: {fetchPosts: () => Promise<void>}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    const [postText, setPostText] = useState<string>("");
    const {user} = useUser();
    
    const handlePost = () => {
        console.log(postText)
        setPostText("");
        setIsPostLengthMax(false);
        const postId = uuidv4();
        console.log(postId)
        handleClose();
        
        if (user === null) {
            console.log("ERROR: ユーザデータがnullです");
            return;
        }
        
        const newPost = {
            postId: postId,
            userId: user.getUsername(),
            content: postText
        }
        try {
            API.graphql(graphqlOperation(createPost, { input: newPost }));
        } catch (e) {
            console.log(e);
        }
        fetchPosts();

    }

    const [isPostLengthMax, setIsPostLengthMax] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        try {
            PostSchema.parse(event.target.value);
            setPostText(event.target.value);
            setIsPostLengthMax(false);
        } catch (error) {
            setIsPostLengthMax(true);
        }
    }
    
    return (
        <>
            <Fab color="primary" aria-label="add" onClick={handleOpen}>
                <ChatIcon />
            </Fab>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // モーダルのスタイルを調整して全画面を占めるようにする
                sx={{
                    display: 'flex', 
                    alignItems: 'center', // 垂直方向の位置を中央に設定
                    justifyContent: 'center', // 水平方向の位置を中央に設定
                    mt: -20 // マージントップをマイナス値にすることで、中央より上にずらす
                }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {/* タイトル */}
                    </Typography>
                    <Divider/>
                    <TextField multiline fullWidth size="medium" label="今はどんな気分？" value={postText} onChange={handleChange}/>
                    
                    <Typography textAlign={"right"} sx={isPostLengthMax ? {color: "red"} : {color: "black"}}>{postText.length} / 140</Typography>
                    <Stack direction={'row-reverse'}>
                        <Button variant="contained" sx={{m: 1}} onClick={handlePost}>エコー！</Button>
                        <Button variant="outlined" sx={{m: 1}} onClick={handleClose}>キャンセル</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );

}

export default PostFAB;