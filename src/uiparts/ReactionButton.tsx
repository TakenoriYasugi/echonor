import { IconButton } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { ReactNode, useState } from "react";
import { ReactionColor, ReactionCounts, ReactionType } from "../constants/Constants";
import TagFacesIcon from '@mui/icons-material/TagFaces';

const ReactionButton = (
    {variant, reactionCounts, setReactionCounts, setIsReactionOpen}: 
    {variant: ReactionType,
        reactionCounts: ReactionCounts,
        setReactionCounts: React.Dispatch<React.SetStateAction<ReactionCounts>>,
        setIsReactionOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) => {

    const [iconColor, setIconColor] = useState("gray");
    var icon: ReactNode = null;
    const [isPushed, setIsPushed] = useState<boolean>(false);

    // TODO: 処理に無駄が多そうなので何とかする
    switch(variant) {
        case ReactionType.Heart:
            icon = <FavoriteIcon sx={{color: iconColor}}/>;
            break;
        case ReactionType.Good:
            icon = <ThumbUpAltIcon sx={{color: iconColor}}/>;
            break;
        
        case ReactionType.Smile:
            icon = <TagFacesIcon sx={{color: iconColor}}/>;
            break;
        
        case ReactionType.Sad:
            icon = <SentimentVeryDissatisfiedIcon sx={{color: iconColor}}/>;
            break;
        
        case ReactionType.Surprise:
            icon = <PriorityHighIcon sx={{color: iconColor}}/>;
            break;

        case ReactionType.Bad:
            icon = <ThumbDownAltIcon sx={{color: iconColor}}/>;
            break;
        default:
            console.log("リアクションアイコン表示エラー")
            break;
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        switch(variant) {
            case ReactionType.Heart:
                if (isPushed) {
                    setIconColor(ReactionColor.Default);
                    setReactionCounts({...reactionCounts, heart: reactionCounts.heart - 1});
                } else {
                    setIconColor(ReactionColor.Heart);
                    setReactionCounts({...reactionCounts, heart: reactionCounts.heart + 1});
                }
                break;
            
            case ReactionType.Good:
                if (isPushed) {
                    setIconColor(ReactionColor.Default);
                    setReactionCounts({...reactionCounts, good: reactionCounts.good - 1});                
                } else {
                    setIconColor(ReactionColor.Good);
                    setReactionCounts({...reactionCounts, good: reactionCounts.good + 1});                
                }
                break;
            
            case ReactionType.Smile:
                if (isPushed) {
                    setIconColor(ReactionColor.Default);
                    setReactionCounts({...reactionCounts, smile: reactionCounts.smile - 1}); 
                } else {
                    setIconColor(ReactionColor.Smile);
                    setReactionCounts({...reactionCounts, smile: reactionCounts.smile + 1});                
                }
                break;
            
            case ReactionType.Sad:
                if (isPushed) {
                    setIconColor(ReactionColor.Default);
                    setReactionCounts({...reactionCounts, sad: reactionCounts.sad - 1});                
                } else {
                    setIconColor(ReactionColor.Sad);
                    setReactionCounts({...reactionCounts, sad: reactionCounts.sad + 1});                
                }
                break;
            
            case ReactionType.Surprise:
                if (isPushed) {
                    setIconColor(ReactionColor.Default);
                    setReactionCounts({...reactionCounts, surprise: reactionCounts.surprise - 1});
                } else {
                    setIconColor(ReactionColor.Surprise);
                    setReactionCounts({...reactionCounts, surprise: reactionCounts.surprise + 1});               
                }
                break;

            case ReactionType.Bad:
                if (isPushed) {
                    setIconColor(ReactionColor.Default);
                    setReactionCounts({...reactionCounts, bad: reactionCounts.bad - 1});                
                } else {
                    setIconColor(ReactionColor.Bad);
                    setReactionCounts({...reactionCounts, bad: reactionCounts.bad + 1});                
                }
                break;
            default:
                console.log("リアクションアイコン押下時エラー")
                break;
        }

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

export default ReactionButton;