import { Button, Card, CardContent, Fab, Icon, Modal, Stack, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";
import { IsReactionedStates, ReactionColor, ReactionCounts, ReactionType } from "../constants/Constants";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { ReactionStatesListContext } from "../AppWrapper";
import ChatIcon from '@mui/icons-material/Chat';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export enum GuestButtonType {
    MyPage,
    ReactionGood,
    ReactionHeart,
    ReactionSmile,
    ReactionSad,
    ReactionBad,
    ReactionBookmark,
    PostFAB
}


// ゲストモード用のデータ。操作にログインが必要な場合は、このコンポーネントを使う。
const GuestButton = ({type, onSignIn}: {type: GuestButtonType, onSignIn: (method: string) => void}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const handleClose = () => {
        setIsOpen(false);
    }
    
    const handleClick = () => {
        console.log("handleClick");
        setIsOpen(true);
    }

    const handleLoginClick = () => {
        onSignIn("login");
        setIsOpen(false);
    }

    const modal = <>
        <Modal
            onClose={handleClose}
            open={isOpen}
            sx={{
                display: 'flex', 
                alignItems: 'center', // 垂直方向の位置を中央に設定
                justifyContent: 'center', // 水平方向の位置を中央に設定
                mt: -20 // マージントップをマイナス値にすることで、中央より上にずらす
            }}
            >
                <Card>
                    <CardContent sx={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                        <Stack direction={"column"} alignItems={"center"}>
                            <Typography sx={{m: 2}}>この操作にはログインが必要です</Typography>
                            <Button variant="contained" onClick={handleLoginClick}>ログイン / ユーザー登録</Button>
                            <Button variant="text" onClick={handleClose}>閉じる</Button>
                        </Stack>
                    </CardContent>
                </Card>
        </Modal>
    </>

    switch(type) {
        case GuestButtonType.MyPage:
            return (
                <>
                    <Button
                        sx={{textTransform: 'none'}}
                        color='secondary' variant='outlined'
                        onClick={() => handleClick()}>
                            MyPage
                    </Button>{modal}
                </>
                );
        case GuestButtonType.ReactionGood:
            return <>
                <IconButton onClick={handleClick}><ThumbUpAltIcon sx={{color: ReactionColor.Good}}/></IconButton>{modal}
            </>
        case GuestButtonType.ReactionHeart:
            return <>
                <IconButton onClick={handleClick}><FavoriteIcon sx={{color: ReactionColor.Heart}}/></IconButton>{modal}
            </>
        case GuestButtonType.ReactionSmile:
            return <>
                <IconButton onClick={handleClick}><TagFacesIcon sx={{color: ReactionColor.Smile}}/></IconButton>{modal}
            </>
        case GuestButtonType.ReactionSad:
            return <>
                <IconButton onClick={handleClick}><SentimentVeryDissatisfiedIcon sx={{color: ReactionColor.Sad}}/></IconButton>{modal}
            </>
        case GuestButtonType.ReactionBad:
            return <>
                <IconButton onClick={handleClick}><ThumbDownAltIcon sx={{color: ReactionColor.Bad}}/></IconButton>{modal}
            </>
        case GuestButtonType.ReactionBookmark:
            return <>
                <IconButton onClick={handleClick}><BookmarksIcon sx={{color: ReactionColor.Bookmark}}/></IconButton>{modal}
            </>
        case GuestButtonType.PostFAB:
            return <>
                <Fab color="primary" onClick={handleClick}><ChatIcon /></Fab>{modal}
            </>
        default:
            return <>error</>;
    }

    return (
        <>
            
        </>
    );
};

export default GuestButton;