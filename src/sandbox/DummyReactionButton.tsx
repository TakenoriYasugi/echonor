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
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const DummyReactionButton = (
    {variant, reactionCounts, setReactionCounts, setIsReactionOpen, postId, fetchUpdatePost, fetchUpdateReactionStates, initialIsPushed}: 
    {variant: ReactionType,
        reactionCounts: ReactionCounts,
        setReactionCounts: React.Dispatch<React.SetStateAction<ReactionCounts>>,
        setIsReactionOpen: React.Dispatch<React.SetStateAction<boolean>>,
        postId: string,
        fetchUpdatePost: (changedReactionCounts: ReactionCounts) => Promise<void>,
        fetchUpdateReactionStates: (changedReactionStates: IsReactionedStates) => Promise<void>,
        initialIsPushed: boolean
    }) => {        

    const [isPushed, setIsPushed] = useState<boolean>(initialIsPushed);
    const [icon, setIcon] = useState<ReactNode>();
    const dummyStates = {postId: postId, states: {heart: false, good: false, smile: false, sad: false, bad: false, bookmark: false}}

    useLayoutEffect(() => {
        // ダミー用のstate。以下の処理で使用するダミーデータを作成する。
        const state = dummyStates;

        // TODO: 処理に無駄が多そうなので何とかする
        switch(variant) {
            case ReactionType.Heart:
                setIcon(<FavoriteIcon sx={isPushed ? {color: ReactionColor.Heart} : {color: ReactionColor.Default}}/>);
                break;
    
            case ReactionType.Good:
                setIcon(<ThumbUpAltIcon sx={isPushed ? {color: ReactionColor.Good} : {color: ReactionColor.Default}}/>);
                break;
            
            case ReactionType.Smile:
                setIcon(<TagFacesIcon sx={isPushed ? {color: ReactionColor.Smile} : {color: ReactionColor.Default}}/>);
                break;
            
            case ReactionType.Sad:
                setIcon(<SentimentVeryDissatisfiedIcon sx={isPushed ? {color: ReactionColor.Sad} : {color: ReactionColor.Default}}/>);
                break;
    
            case ReactionType.Bad:
                setIcon(<ThumbDownAltIcon sx={isPushed ? {color: ReactionColor.Bad} : {color: ReactionColor.Default}}/>);
                break;
            
            case ReactionType.Bookmark:
                setIcon(<BookmarksIcon sx={isPushed ? {color: ReactionColor.Bookmark} : {color: ReactionColor.Default}}/>);
                break;
                
            default:
                console.log("リアクションアイコン表示エラー")
                break;
        }
    }, [isPushed]);
    

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // クリックイベントが伝播しないようにする。
        event.stopPropagation();

        var changedReactionCounts: ReactionCounts = {
            heart: 0,
            good: 0,
            smile: 0,
            sad: 0,
            bad: 0,
            bookmark: 0
        };
        
        const state = dummyStates;

        const blankStates = {
            good: false,
            heart: false,
            smile: false,
            sad: false,
            bad: false,
            bookmark: false
        }
        var changedReactionStates: IsReactionedStates = state?.states || blankStates ;

        setIsPushed(!isPushed);
        setIsReactionOpen(false);
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                {icon}
            </IconButton>
        </>
    );
}

export default DummyReactionButton;