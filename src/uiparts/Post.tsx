// タイムラインに流れる投稿

import { Box, Card, CardActionArea, CardContent, Collapse, Divider, Grow, IconButton, Popover, Stack, Typography, Zoom } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ReactionButton from "./ReactionButton";
import { ReactionCounts, ReactionType } from "../constants/Constants";
import dayjs from "dayjs";

const Post = ({text, date} : {text: string, date: string}) => {

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

    const [reactionCounts, setReactionCounts] = useState<ReactionCounts>({heart: 0, good: 0, smile: 0, sad: 0, surprise: 0, bad: 0});
    const isReactioned = () => {
      return (reactionCounts.heart > 0 || reactionCounts.good || reactionCounts.smile > 0 || reactionCounts.sad > 0 || reactionCounts.bad > 0);
    }
    
    // Zoomコンポーネントを使用してアニメーションを適用
    return (
      <>
        <div ref={cardRef}>
          <Zoom in={checked} style={{ transformOrigin: "left" }} timeout={800}>
              <Card className="post" sx={{p: 1, m: 3}}>
                <CardActionArea onClick={handleClick}>
                  <CardContent>
                    <Stack direction="column">
                      <Typography fontSize={"small"}>{date}</Typography>
                      <Typography fontSize={"medium"}>{text}</Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
                {isReactioned() && <Divider/>}
                <Stack direction={"row"}>
                  {reactionCounts.heart > 0 && <>
                        <ReactionButton variant={ReactionType.Heart} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
                        <Typography fontSize={"small"}>{reactionCounts.heart}</Typography>
                    </>}
                  {reactionCounts.good > 0 && <>
                        <ReactionButton variant={ReactionType.Good} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
                        <Typography fontSize={"small"}>{reactionCounts.good}</Typography>
                    </>}
                  {reactionCounts.smile > 0 && <>
                        <ReactionButton variant={ReactionType.Smile} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
                        <Typography fontSize={"small"}>{reactionCounts.smile}</Typography>
                    </>}
                  {reactionCounts.sad > 0 && <>
                        <ReactionButton variant={ReactionType.Sad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
                        <Typography fontSize={"small"}>{reactionCounts.sad}</Typography>
                    </>}
                  {reactionCounts.surprise > 0 && <>
                        <ReactionButton variant={ReactionType.Surprise} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
                        <Typography fontSize={"small"}>{reactionCounts.surprise}</Typography>
                    </>}
                  {reactionCounts.bad > 0 && <>
                        <ReactionButton variant={ReactionType.Bad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
                        <Typography fontSize={"small"}>{reactionCounts.bad}</Typography>
                    </>}
                  

                </Stack>
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
              <ReactionButton variant={ReactionType.Heart} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
              <ReactionButton variant={ReactionType.Good} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
              <ReactionButton variant={ReactionType.Smile} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
              <ReactionButton variant={ReactionType.Sad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
              <ReactionButton variant={ReactionType.Surprise} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
              <ReactionButton variant={ReactionType.Bad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen}/>
            </CardContent>
          </Card>
        </Popover>
      </>
    );
  }

export default Post;