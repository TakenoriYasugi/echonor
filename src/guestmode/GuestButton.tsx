import { Button, Fab, Icon } from "@mui/material";
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
const GuestButton = ({type}: {type: GuestButtonType}) => {
    const handleClick = () => {
        console.log("clicked");
    }

    switch(type) {
        case GuestButtonType.MyPage:
            return (
                <Button
                    sx={{textTransform: 'none'}}
                    color='secondary' variant='outlined'
                    onClick={handleClick}>
                        MyPage
                </Button>);
        case GuestButtonType.ReactionGood:
            return <IconButton onClick={handleClick}><ThumbUpAltIcon sx={{color: ReactionColor.Good}}/></IconButton>
        case GuestButtonType.ReactionHeart:
            return <IconButton onClick={handleClick}><FavoriteIcon sx={{color: ReactionColor.Heart}}/></IconButton>
        case GuestButtonType.ReactionSmile:
            return <IconButton onClick={handleClick}><TagFacesIcon sx={{color: ReactionColor.Smile}}/></IconButton>
        case GuestButtonType.ReactionSad:
            return <IconButton onClick={handleClick}><SentimentVeryDissatisfiedIcon sx={{color: ReactionColor.Sad}}/></IconButton>
        case GuestButtonType.ReactionBad:
            return <IconButton onClick={handleClick}><ThumbDownAltIcon sx={{color: ReactionColor.Bad}}/></IconButton>
        case GuestButtonType.ReactionBookmark:
            return <IconButton onClick={handleClick}><BookmarksIcon sx={{color: ReactionColor.Bookmark}}/></IconButton>
        case GuestButtonType.PostFAB:
            return <Fab color="primary" onClick={handleClick}><ChatIcon /></Fab>
        default:
            return <></>
    }
};

export default GuestButton;