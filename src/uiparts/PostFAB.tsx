import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Fab, Slide, Stack, TextField } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

const PostFAB = () => {
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
            sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {/* モーダルのタイトル */}
                </Typography>
                <Divider/>
                <TextField multiline fullWidth size="medium" label="今はどんな気分？"/>
                <Stack direction={'row-reverse'}>
                    <Button variant="contained" sx={{m: 1}} onClick={handleClose}>エコー！</Button>
                    <Button variant="outlined" sx={{m: 1}} onClick={handleClose}>キャンセル</Button>
                </Stack>
            </Box>
        </Modal>
    </>
);

}

export default PostFAB;