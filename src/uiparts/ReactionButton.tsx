import { IconButton } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { ReactNode, useState } from "react";
import { ReactionColor, ReactionCounts, ReactionType } from "../constants/Constants";

const ReactionButton = (
    {variant, reactionCounts, setReactionCounts}: 
    {variant: ReactionType, reactionCounts: ReactionCounts, setReactionCounts: React.Dispatch<React.SetStateAction<ReactionCounts>>
    }) => {

    const [iconColor, setIconColor] = useState("gray");
    var icon: ReactNode = null;

    // TODO: 処理に無駄が多そうなので何とかする
    switch(variant) {
        case ReactionType.Heart:
            icon = <FavoriteIcon sx={{color: iconColor}}/>;
            break;
        case ReactionType.Good:
            icon = <ThumbUpAltIcon sx={{color: iconColor}}/>;
            break;
        
        case ReactionType.Smile:
            icon = <EmojiEmotionsIcon sx={{color: iconColor}}/>;
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
                setIconColor(ReactionColor.Heart);
                setReactionCounts({...reactionCounts, heart: reactionCounts.heart + 1});
                icon = <FavoriteIcon/>;
                break;
            
            case ReactionType.Good:
                setIconColor(ReactionColor.Good);
                setReactionCounts({...reactionCounts, good: reactionCounts.good + 1});                
                icon = <ThumbUpAltIcon/>;
                break;
            
            case ReactionType.Smile:
                setIconColor(ReactionColor.Smile);
                setReactionCounts({...reactionCounts, smile: reactionCounts.smile + 1});                

                icon = <EmojiEmotionsIcon/>;
                break;
            
            case ReactionType.Sad:
                setIconColor(ReactionColor.Sad);
                icon = <SentimentVeryDissatisfiedIcon/>;
                setReactionCounts({...reactionCounts, sad: reactionCounts.sad + 1});                
                break;
            
            case ReactionType.Surprise:
                setIconColor(ReactionColor.Surprise);
                setReactionCounts({...reactionCounts, surprise: reactionCounts.surprise + 1});               
                icon = <PriorityHighIcon/>;
                break;

            case ReactionType.Bad:
                setIconColor(ReactionColor.Bad);
                setReactionCounts({...reactionCounts, bad: reactionCounts.bad + 1});                

                icon = <ThumbDownAltIcon/>;
                break;
            default:
                console.log("リアクションアイコン押下時エラー")
                break;
        }
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