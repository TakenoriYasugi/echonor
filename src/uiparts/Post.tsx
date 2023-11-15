// タイムラインに流れる投稿

import { Card, CardActionArea, CardContent, Collapse, Divider, Grow, IconButton, Popover, Zoom } from "@mui/material";
// import '../css/post.css';
import { useState, useRef, useEffect } from "react";

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ReactionButton from "./ReactionButton";
import { ReactionType } from "../constants/Constants";

const Post = ({text} : {text: string}) => {

    const [checked, setChecked] = useState(false);
    const cardRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // ビューポートに入るとアニメーションをトリガーする
          if (entry.isIntersecting) {
            setChecked(true);
            // 一度トリガーしたらオブザーバーを解除する
            observer.disconnect();
          }
        },
        {
          threshold: 0.1, // 10%の要素が見えたらトリガー
        }
      );
  
      const { current } = cardRef;
      if (current) {
        observer.observe(current);
      }
  
      return () => {
        observer.disconnect();
      };
    }, []);

    const [isReactionOpen, setIsReactionOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsReactionOpen(true);
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setIsReactionOpen(false);
      setAnchorEl(null);
    }

    // Zoomコンポーネントを使用してアニメーションを適用
    return (
      <>
        <div ref={cardRef}>
          <Zoom in={checked} style={{ transformOrigin: "left" }} timeout={800}>
              <Card className="post" sx={{p: 2, m: 3}}>
                <CardActionArea onClick={handleClick}>
                  <CardContent>
                      {text}
                  </CardContent>
                  <Divider/>
                </CardActionArea>
              </Card>
          </Zoom>
        </div>

        <Popover
          open={isReactionOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>

          {/* リアクション用のポップ */}
          <Card>
            <CardContent>
              <ReactionButton variant={ReactionType.Heart}/>
              <ReactionButton variant={ReactionType.Good}/>
              <ReactionButton variant={ReactionType.Smile}/>
              <ReactionButton variant={ReactionType.Sad}/>
              <ReactionButton variant={ReactionType.Surprise}/>
              <ReactionButton variant={ReactionType.Bad}/>
            </CardContent>
          </Card>
        </Popover>
      </>
    );
  }

export default Post;