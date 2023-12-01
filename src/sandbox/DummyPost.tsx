// タイムラインに流れる投稿

import { Box, Card, CardActionArea, CardContent, Collapse, Divider, Grid, Grow, IconButton, Popover, Stack, Typography, Zoom } from "@mui/material";
import { useState, useRef, useEffect, useContext } from "react";
import { IsReactionedStates, ReactionCounts, ReactionType } from "../constants/Constants";
import { GetUserInfo } from "../util/Authenticator";
import { API, graphqlOperation } from "aws-amplify";
import { createReaction, updatePost, updateReaction } from "../graphql/mutations";
import { ReactionStates } from "../context/ReactionContext";
import { ReactionStatesListContext } from "../AppWrapper";
import DummyReactionButton from "./DummyReactionButton";

const DummyPost = ({id, postId, text, date, initialReactionCounts} : {id: string, postId: string, text: string, date: string, initialReactionCounts: ReactionCounts}) => {

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

    const fetchUpdateReactionStates = async (changedReactionStates: IsReactionedStates) => {}

    const fetchUpdatePost = async (changedReactionCounts: ReactionCounts) => {}

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
                        <DummyReactionButton variant={ReactionType.Bookmark} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.bookmark || false}/>
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
                        <DummyReactionButton variant={ReactionType.Heart} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.heart || false}/>
                        <Typography fontSize={"small"}>{reactionCounts.heart}</Typography>
                    </>}
                  {reactionCounts.good > 0 && <>
                        <DummyReactionButton variant={ReactionType.Good} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates}  initialIsPushed={getReactionStates(postId)?.states.good || false}/>
                        <Typography fontSize={"small"}>{reactionCounts.good}</Typography>
                    </>}
                  {reactionCounts.smile > 0 && <>
                        <DummyReactionButton variant={ReactionType.Smile} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates}  initialIsPushed={getReactionStates(postId)?.states.smile || false}/>
                        <Typography fontSize={"small"}>{reactionCounts.smile}</Typography>
                    </>}
                  {reactionCounts.sad > 0 && <>
                        <DummyReactionButton variant={ReactionType.Sad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates}  initialIsPushed={getReactionStates(postId)?.states.sad || false}/>
                        <Typography fontSize={"small"}>{reactionCounts.sad}</Typography>
                    </>}
                  {reactionCounts.bad > 0 && <>
                        <DummyReactionButton variant={ReactionType.Bad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates}  initialIsPushed={getReactionStates(postId)?.states.bad || false}/>
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
              <DummyReactionButton variant={ReactionType.Heart} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.heart || false}/>
              <DummyReactionButton variant={ReactionType.Good} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.good || false}/>
              <DummyReactionButton variant={ReactionType.Smile} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.smile || false}/>
              <DummyReactionButton variant={ReactionType.Sad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.sad || false}/>
              <DummyReactionButton variant={ReactionType.Bad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.bad || false}/>
            </CardContent>
          </Card>
        </Popover>
      </>
    );
  }

export default DummyPost;