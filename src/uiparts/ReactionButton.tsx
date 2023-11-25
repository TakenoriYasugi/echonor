import { IconButton } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { ReactNode, useContext, useEffect, useState } from "react";
import { IsReactionedStates, ReactionColor, ReactionCounts, ReactionType } from "../constants/Constants";
import TagFacesIcon from '@mui/icons-material/TagFaces';

const ReactionButton = (
    {variant, reactionCounts, setReactionCounts, setIsReactionOpen, postId, reactionStates, setReactionStatus, fetchUpdatePost, fetchUpdateReactionStates}: 
    {variant: ReactionType,
        reactionCounts: ReactionCounts,
        setReactionCounts: React.Dispatch<React.SetStateAction<ReactionCounts>>,
        setIsReactionOpen: React.Dispatch<React.SetStateAction<boolean>>,
        postId: string,
        reactionStates: IsReactionedStates,
        setReactionStatus: React.Dispatch<React.SetStateAction<IsReactionedStates>>,
        fetchUpdatePost: (changedReactionCounts: ReactionCounts) => Promise<void>,
        fetchUpdateReactionStates: (changedReactionStates: IsReactionedStates) => Promise<void>
    }) => {        

    const [isPushed, setIsPushed] = useState<boolean>(false);
    const [icon, setIcon] = useState<ReactNode>();

    useEffect(() => {
        // TODO: 処理に無駄が多そうなので何とかする
        switch(variant) {
            case ReactionType.Heart:
                setIcon(<FavoriteIcon sx={isPushed ? {color: ReactionColor.Heart} : {color: ReactionColor.Default}}/>);
                setIsPushed(reactionStates.heart)
                break;

            case ReactionType.Good:
                setIcon(<ThumbUpAltIcon sx={isPushed ? {color: ReactionColor.Good} : {color: ReactionColor.Default}}/>);
                setIsPushed(reactionStates.good)
                break;
            
            case ReactionType.Smile:
                setIcon(<TagFacesIcon sx={isPushed ? {color: ReactionColor.Smile} : {color: ReactionColor.Default}}/>);
                setIsPushed(reactionStates.smile)
                break;
            
            case ReactionType.Sad:
                setIcon(<SentimentVeryDissatisfiedIcon sx={isPushed ? {color: ReactionColor.Sad} : {color: ReactionColor.Default}}/>);
                setIsPushed(reactionStates.sad)
                break;
    
            case ReactionType.Bad:
                setIcon(<ThumbDownAltIcon sx={isPushed ? {color: ReactionColor.Bad} : {color: ReactionColor.Default}}/>);
                setIsPushed(reactionStates.bad)
                break;
            default:
                console.log("リアクションアイコン表示エラー")
                break;
        }
    }, [isPushed])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        var changedReactionCounts: ReactionCounts = {
            heart: 0,
            good: 0,
            smile: 0,
            sad: 0,
            bad: 0};

        var changedReactionStates: IsReactionedStates = reactionStates;
        
        switch(variant) {
            case ReactionType.Heart:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, heart: reactionCounts.heart - 1});
                    changedReactionStates = {...reactionStates, heart: false}
                } else {
                    changedReactionCounts = ({...reactionCounts, heart: reactionCounts.heart + 1});
                    changedReactionStates = {...reactionStates, heart: true}
                }
                break;
            
            case ReactionType.Good:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, good: reactionCounts.good - 1});
                    changedReactionStates = {...reactionStates, good: false}
                } else {
                    changedReactionCounts = ({...reactionCounts, good: reactionCounts.good + 1});
                    changedReactionStates = {...reactionStates, good: true}
                }
                break;
            
            case ReactionType.Smile:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, smile: reactionCounts.smile - 1});
                    changedReactionStates = {...reactionStates, smile: false}
                } else {
                    changedReactionCounts = ({...reactionCounts, smile: reactionCounts.smile + 1});
                    changedReactionStates = {...reactionStates, smile: true}
                }
                break;
            
            case ReactionType.Sad:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, sad: reactionCounts.sad - 1});
                    changedReactionStates = {...reactionStates, sad: false}
                } else {
                    changedReactionCounts = ({...reactionCounts, sad: reactionCounts.sad + 1});
                    changedReactionStates = {...reactionStates, sad: true}
                }
                break;

            case ReactionType.Bad:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, bad: reactionCounts.bad - 1});
                    changedReactionStates = {...reactionStates, bad: false}

                } else {
                    changedReactionCounts = ({...reactionCounts, bad: reactionCounts.bad + 1});
                    changedReactionStates = {...reactionStates, bad: true}
                }
                break;
            default:
                console.log("リアクションアイコン押下時エラー")
                break;
        }

        setIsPushed(!isPushed);
        setIsReactionOpen(false);
        fetchUpdatePost(changedReactionCounts);
        fetchUpdateReactionStates(changedReactionStates);
        setReactionCounts(changedReactionCounts);
        setReactionStatus(changedReactionStates);
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                {icon}
            </IconButton>
        </>
    );
}

export default ReactionButton;