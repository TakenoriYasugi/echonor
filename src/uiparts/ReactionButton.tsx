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


const ReactionButton = (
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

    const reactions = useContext(ReactionStatesListContext);
    
    useLayoutEffect(() => {
        const state = reactions.reactionStatesList.find((reaction) => (reaction.postId === postId));
        // TODO: 処理に無駄が多そうなので何とかする
        switch(variant) {
            case ReactionType.Heart:
                setIcon(<FavoriteIcon sx={isPushed ? {color: ReactionColor.Heart} : {color: ReactionColor.Default}}/>);
                setIsPushed(state?.states.heart || false)
                break;
    
            case ReactionType.Good:
                setIcon(<ThumbUpAltIcon sx={isPushed ? {color: ReactionColor.Good} : {color: ReactionColor.Default}}/>);
                setIsPushed(state?.states.good || false)
                break;
            
            case ReactionType.Smile:
                setIcon(<TagFacesIcon sx={isPushed ? {color: ReactionColor.Smile} : {color: ReactionColor.Default}}/>);
                setIsPushed(state?.states.smile || false)
                break;
            
            case ReactionType.Sad:
                setIcon(<SentimentVeryDissatisfiedIcon sx={isPushed ? {color: ReactionColor.Sad} : {color: ReactionColor.Default}}/>);
                setIsPushed(state?.states.sad || false)
                break;
    
            case ReactionType.Bad:
                setIcon(<ThumbDownAltIcon sx={isPushed ? {color: ReactionColor.Bad} : {color: ReactionColor.Default}}/>);
                setIsPushed(state?.states.bad || false)
                break;
            
            case ReactionType.Bookmark:
                setIcon(<BookmarksIcon sx={isPushed ? {color: ReactionColor.Bookmark} : {color: ReactionColor.Default}}/>);
                setIsPushed(state?.states.bookmark || false)
                break;
                
            default:
                console.log("リアクションアイコン表示エラー")
                break;
        }
    }, [isPushed, reactions]);
    

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
        
        const state = reactions.reactionStatesList.find((reaction) => (reaction.postId === postId));

        const blankStates = {
            good: false,
            heart: false,
            smile: false,
            sad: false,
            bad: false,
            bookmark: false
        }
        var changedReactionStates: IsReactionedStates = state?.states || blankStates ;
        
        switch(variant) {
            case ReactionType.Heart:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, heart: reactionCounts.heart - 1});
                    changedReactionStates = {...changedReactionStates, heart: false}
                } else {
                    changedReactionCounts = ({...reactionCounts, heart: reactionCounts.heart + 1});
                    changedReactionStates = {...changedReactionStates, heart: true}
                }
                break;
            
            case ReactionType.Good:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, good: reactionCounts.good - 1});
                    changedReactionStates = {...changedReactionStates, good: false}
                } else {
                    changedReactionCounts = ({...reactionCounts, good: reactionCounts.good + 1});
                    changedReactionStates = {...changedReactionStates, good: true}
                }
                break;
            
            case ReactionType.Smile:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, smile: reactionCounts.smile - 1});
                    changedReactionStates = {...changedReactionStates, smile: false}
                } else {
                    changedReactionCounts = ({...reactionCounts, smile: reactionCounts.smile + 1});
                    changedReactionStates = {...changedReactionStates, smile: true}
                }
                break;
            
            case ReactionType.Sad:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, sad: reactionCounts.sad - 1});
                    changedReactionStates = {...changedReactionStates, sad: false}
                } else {
                    changedReactionCounts = ({...reactionCounts, sad: reactionCounts.sad + 1});
                    changedReactionStates = {...changedReactionStates, sad: true}
                }
                break;

            case ReactionType.Bad:
                if (isPushed) {
                    changedReactionCounts = ({...reactionCounts, bad: reactionCounts.bad - 1});
                    changedReactionStates = {...changedReactionStates, bad: false}

                } else {
                    changedReactionCounts = ({...reactionCounts, bad: reactionCounts.bad + 1});
                    changedReactionStates = {...changedReactionStates, bad: true}
                }
                break;
            
            case ReactionType.Bookmark:
            if (isPushed) {
                changedReactionCounts = ({...reactionCounts, bookmark: reactionCounts.bookmark ? reactionCounts.bookmark - 1 : 0});
                changedReactionStates = {...changedReactionStates, bookmark: false}

            } else {
                changedReactionCounts = ({...reactionCounts, bookmark: reactionCounts.bookmark ? reactionCounts.bookmark + 1 : 1});
                changedReactionStates = {...changedReactionStates, bookmark: true}
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
        const changedReactions = reactions.reactionStatesList.map((reaction) => {
            if (reaction.postId === postId) {
                return {...reaction, states: changedReactionStates}
            } else {
                return reaction;
            }
        })
        reactions.setReactionStatesList(changedReactions);
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