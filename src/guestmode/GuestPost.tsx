// タイムラインに流れる投稿

import { Card, CardActionArea, CardContent, Divider, Grid, Popover, Stack, Typography, Zoom } from "@mui/material";
import { useState, useRef, useEffect, useContext } from "react";
import { ReactionCounts, ReactionType } from "../constants/Constants";
import { ReactionStates } from "../context/ReactionContext";
import { ReactionStatesListContext } from "../AppWrapper";
import GuestButton, { GuestButtonType } from "./GuestButton";

const GuestPost = ({id, postId, text, date, initialReactionCounts} : {id: string, postId: string, text: string, date: string, initialReactionCounts: ReactionCounts}) => {

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

    const [reactionCounts, setReactionCounts] = useState<ReactionCounts>(initialReactionCounts);

    const isReactioned = () => {
      return (reactionCounts.heart > 0 || reactionCounts.good > 0 || reactionCounts.smile > 0 || reactionCounts.sad > 0 || reactionCounts.bad > 0);
    }

    const reactions = useContext(ReactionStatesListContext);

    const getReactionStates = (postId: string) : ReactionStates | null => {
        // ダミーを返却
        return {id: "", postId: postId, states: {good: false, heart: false, smile: false, sad: false, bad: false, bookmark: false}};
    }

    // Zoomコンポーネントを使用してアニメーションを適用
    return (
      <>
        <div ref={cardRef}>
          <Zoom in={checked} style={{ transformOrigin: "left" }} timeout={800}>
              <Card className="post" sx={{p: 0.5, m: 3}}>
                <CardContent sx={{p: 1, pt: 0}}>
                  <Grid container>
                    <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography fontSize={"small"}>{date}</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* <GuestButton variant={ReactionType.Bookmark} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} initialIsPushed={getReactionStates(postId)?.states.bookmark || false}/> */}
                        <GuestButton type={GuestButtonType.ReactionBookmark} />
                        <Typography fontSize={"small"}>{reactionCounts.bookmark || ""}</Typography>
                    </Grid>
                    <CardActionArea onClick={handleClick}>
                        <Grid item xs={12} sx={{minHeight: "50px"}}>
                          <Typography fontSize={"medium"}>{text}</Typography>
                        </Grid>
                    </CardActionArea>
                  </Grid>
                </CardContent>
    
                {isReactioned() && <Divider/>}
                <Stack direction={"row"}>
                  {reactionCounts.heart > 0 && <>
                        <GuestButton type={GuestButtonType.ReactionHeart} />
                        <Typography fontSize={"small"}>{reactionCounts.heart}</Typography>
                    </>}
                  {reactionCounts.good > 0 && <>
                        <GuestButton type={GuestButtonType.ReactionGood} />
                        <Typography fontSize={"small"}>{reactionCounts.good}</Typography>
                    </>}
                  {reactionCounts.smile > 0 && <>
                        <GuestButton type={GuestButtonType.ReactionSmile} />
                        <Typography fontSize={"small"}>{reactionCounts.smile}</Typography>
                    </>}
                  {reactionCounts.sad > 0 && <>
                        <GuestButton type={GuestButtonType.ReactionSad} />
                        <Typography fontSize={"small"}>{reactionCounts.sad}</Typography>
                    </>}
                  {reactionCounts.bad > 0 && <>
                        <GuestButton type={GuestButtonType.ReactionBad} />
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
                <GuestButton type={GuestButtonType.ReactionHeart} />
                <GuestButton type={GuestButtonType.ReactionGood} />
                <GuestButton type={GuestButtonType.ReactionSmile} />
                <GuestButton type={GuestButtonType.ReactionSad} />
                <GuestButton type={GuestButtonType.ReactionBad} />
            </CardContent>
          </Card>
        </Popover>
      </>
    );
  }

export default GuestPost;