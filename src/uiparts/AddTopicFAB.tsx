import { Fab, Modal, Box, Typography, Divider, TextField, Stack, Button } from "@mui/material";
import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import { createPost, createTopic } from "../graphql/mutations";
import { useUser } from "../util/UserProvider";
import { PostSchema, TopicTitleSchema } from "../varidations/VaridationSchema";
import ChatIcon from '@mui/icons-material/Chat';

const AddTopicFAB = () => {
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
    
    const [topicTitle, setTopicTitle] = useState<string>("");
    const {user} = useUser();
    
    const handleAddTopic = () => {
        setTopicTitle("");
        setIsTopicTitleLengthMax(false);
        handleClose();
        
        if (user === null) {
            console.log("ERROR: ユーザデータがnullです");
            return;
        }
        
        const newTopic = {
            createdBy: user.getUsername(),
            title: topicTitle
        }

        try {
            API.graphql(graphqlOperation(createTopic, { input: newTopic }));
        } catch (e) {
            console.log(e);
        }
    }

    const [isTopicTitleLengthMax, setIsTopicTitleLengthMax] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        try {
            TopicTitleSchema.parse(event.target.value);
            setTopicTitle(event.target.value);
            setIsTopicTitleLengthMax(false);
        } catch (error) {
            setIsTopicTitleLengthMax(true);
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
                    <TextField multiline fullWidth size="medium" label="皆と話したいことは？" value={topicTitle} onChange={handleChange}/>
                    
                    <Typography textAlign={"right"} sx={isTopicTitleLengthMax ? {color: "red"} : {color: "black"}}>{topicTitle.length} / 140</Typography>
                    <Stack direction={'row-reverse'}>
                        <Button variant="contained" sx={{m: 1}} onClick={handleAddTopic}>トピック登録！</Button>
                        <Button variant="outlined" sx={{m: 1}} onClick={handleClose}>キャンセル</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default AddTopicFAB;