// タイムラインに流れる投稿

import { Card, CardActionArea, CardContent, Collapse, Divider, Grid, Grow, IconButton, Popover, Stack, Typography, Zoom } from "@mui/material";
import { useState, useRef, useEffect, useContext } from "react";
import ReactionButton from "./ReactionButton";
import { IsReactionedStates, ReactionCounts, ReactionType } from "../constants/Constants";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { GetUserInfo } from "../util/Authenticator";
import { ReactionStatesListContext } from "../App";
import { API, graphqlOperation } from "aws-amplify";
import { updatePost } from "../graphql/mutations";

const Post = ({id, postId, text, date, initialReactionCounts} : {id: string, postId: string, text: string, date: string, initialReactionCounts: ReactionCounts}) => {

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

    const [user, setUser] = useState(null);

    useEffect(() => {
      GetUserInfo().then((user) => {
        setUser(user);
      });
      setReactionStates(getReactionStates(postId));
    }, []);
    
    const blankState = {
      good: false,
      heart: false,
      smile: false,
      sad: false,
      bad: false
    } as IsReactionedStates;
    
    const [reactionStates, setReactionStates] = useState<IsReactionedStates>(blankState);
    
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
    
    const [isBookmarked, setIsBookmarked] = useState(false);

    const reactions = useContext(ReactionStatesListContext);

    const getReactionStates = (postId: string) : IsReactionedStates => {
        const reactionedPost = reactions.reactionStatesList.filter( (reaction) => (
            postId === reaction.postId
        ));
    
        if (reactionedPost.length > 0) {
            console.log("Reaction detected.");
            return reactionedPost[0].states;
        } else {
            console.log("Reaction undetected.");
            return blankState;
        }
    }

    const fetchUpdatePost = async (changedReactionCounts: ReactionCounts) => {
      const input = {
        postId: postId,  // postIdを指定
        id: id,
        reactionCounts: {...changedReactionCounts, bookmark: 0}  // 更新するreactionCountsの値
      };

      console.log("input : " + input)
    
      try {
        const updatedPostData = await API.graphql(graphqlOperation(updatePost, { input } ));
        console.log('Updated Post:', updatedPostData);
      } catch (error) {
        console.error('Error updating post reaction counts:', error);
      }
    }

    // Zoomコンポーネントを使用してアニメーションを適用
    return (
      <>
        <div ref={cardRef}>
          <Zoom in={checked} style={{ transformOrigin: "left" }} timeout={800}>
              <Card className="post" sx={{p: 0.5, m: 3}}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={10} style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography fontSize={"small"}>{date}</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => {setIsBookmarked(!isBookmarked)}}>
                        <BookmarksIcon sx={ isBookmarked ? {color: "orange"} : {color: "gray"}}/>
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <CardActionArea onClick={handleClick}>
                          <Typography fontSize={"medium"}>{text}</Typography>
                      </CardActionArea>
                    </Grid>
                  </Grid>
                </CardContent>
    
                {isReactioned() && <Divider/>}
                <Stack direction={"row"}>
                  {reactionCounts.heart > 0 && <>
                        <ReactionButton variant={ReactionType.Heart} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
                        <Typography fontSize={"small"}>{reactionCounts.heart}</Typography>
                    </>}
                  {reactionCounts.good > 0 && <>
                        <ReactionButton variant={ReactionType.Good} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
                        <Typography fontSize={"small"}>{reactionCounts.good}</Typography>
                    </>}
                  {reactionCounts.smile > 0 && <>
                        <ReactionButton variant={ReactionType.Smile} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
                        <Typography fontSize={"small"}>{reactionCounts.smile}</Typography>
                    </>}
                  {reactionCounts.sad > 0 && <>
                        <ReactionButton variant={ReactionType.Sad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
                        <Typography fontSize={"small"}>{reactionCounts.sad}</Typography>
                    </>}
                  {reactionCounts.bad > 0 && <>
                        <ReactionButton variant={ReactionType.Bad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
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
              <ReactionButton variant={ReactionType.Heart} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
              <ReactionButton variant={ReactionType.Good} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
              <ReactionButton variant={ReactionType.Smile} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
              <ReactionButton variant={ReactionType.Sad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
              <ReactionButton variant={ReactionType.Bad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} reactionStates={reactionStates} fetchUpdatePost={fetchUpdatePost}/>
            </CardContent>
          </Card>
        </Popover>
      </>
    );
  }

export default Post;