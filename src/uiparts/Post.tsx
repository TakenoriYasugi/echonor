// タイムラインに流れる投稿

import { Card, CardActionArea, CardContent, Collapse, Divider, Grid, Grow, IconButton, Popover, Stack, Typography, Zoom } from "@mui/material";
import { useState, useRef, useEffect, useContext } from "react";
import ReactionButton from "./ReactionButton";
import { IsReactionedStates, ReactionCounts, ReactionType } from "../constants/Constants";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { GetUserInfo } from "../util/Authenticator";
import { API, graphqlOperation } from "aws-amplify";
import { createReaction, updatePost, updateReaction } from "../graphql/mutations";
import { ReactionStates } from "../context/ReactionContext";
import { ReactionStatesListContext } from "../AppWrapper";

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
    
    const [isBookmarked, setIsBookmarked] = useState(false);

    const reactions = useContext(ReactionStatesListContext);

    const getReactionStates = (postId: string) : ReactionStates | null => {
        const reactionedPost = reactions.reactionStatesList.find( (reaction) => (
            postId === reaction.postId
        ));
    
        if (reactionedPost) {
            // console.log("Reaction detected.");
            return reactionedPost;
        } else {
            // console.log("Reaction undetected.");
            return null;
        }
    }

    const fetchUpdateReactionStates = async (changedReactionStates: IsReactionedStates) => {
      const states = getReactionStates(postId);
      if (states === null) {
        // リアクションが存在しない場合は新規作成。
        try {
          console.log("null check")
          const input = {
            // @ts-ignore
            userId: user.username,
            postId: postId,
            reactionStates: changedReactionStates
          }
          const createdReactionData = await API.graphql(graphqlOperation(createReaction, { input } ));
          console.log('Created Reaction:', createdReactionData);
          // @ts-ignore
          reactions.setReactionStatesList([...reactions.reactionStatesList, {id: createdReactionData.data.createReaction.id, postId: postId, states: changedReactionStates}])
        } catch (error) {
          console.error('Error creating reaction state:', error);
        }
      } else {
        // リアクションが存在する場合は更新。
        try {
          const state = getReactionStates(postId);
          // changedReactionStates から __typename フィールドを除去
          // @ts-ignore
          const { __typename, ...sanitizedReactionStates } = changedReactionStates;

          const input = {
            // @ts-ignore
            userId: user.username,
            postId: postId,
            reactionStates: sanitizedReactionStates,
            id: state?.id
          }
          console.log("reaction update: ")
          console.log(input);
          const updatedReactionData = await API.graphql(graphqlOperation(updateReaction, { input } ));
          console.log('Updated Reaction:', updatedReactionData);

          const changedReactions = reactions.reactionStatesList.map( (reaction) => {
            if (reaction.postId === postId) {
              return {...reaction, states: {...sanitizedReactionStates}}
            } else {
              return reaction;
            }
          })

          reactions.setReactionStatesList(changedReactions);

        } catch (error) {
          console.error('Error updated reaction state:', error);
        }
      }
    }

    const fetchUpdatePost = async (changedReactionCounts: ReactionCounts) => {
      const input = {
        postId: postId,  // postIdを指定
        id: id,
        reactionCounts: {...changedReactionCounts}  // 更新するreactionCountsの値
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
                      <ReactionButton variant={ReactionType.Bookmark} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.bookmark || false}/>
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
                        <ReactionButton variant={ReactionType.Heart} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.heart || false}/>
                        <Typography fontSize={"small"}>{reactionCounts.heart}</Typography>
                    </>}
                  {reactionCounts.good > 0 && <>
                        <ReactionButton variant={ReactionType.Good} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates}  initialIsPushed={getReactionStates(postId)?.states.good || false}/>
                        <Typography fontSize={"small"}>{reactionCounts.good}</Typography>
                    </>}
                  {reactionCounts.smile > 0 && <>
                        <ReactionButton variant={ReactionType.Smile} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates}  initialIsPushed={getReactionStates(postId)?.states.smile || false}/>
                        <Typography fontSize={"small"}>{reactionCounts.smile}</Typography>
                    </>}
                  {reactionCounts.sad > 0 && <>
                        <ReactionButton variant={ReactionType.Sad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates}  initialIsPushed={getReactionStates(postId)?.states.sad || false}/>
                        <Typography fontSize={"small"}>{reactionCounts.sad}</Typography>
                    </>}
                  {reactionCounts.bad > 0 && <>
                        <ReactionButton variant={ReactionType.Bad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates}  initialIsPushed={getReactionStates(postId)?.states.bad || false}/>
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
              <ReactionButton variant={ReactionType.Heart} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.heart || false}/>
              <ReactionButton variant={ReactionType.Good} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.good || false}/>
              <ReactionButton variant={ReactionType.Smile} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.smile || false}/>
              <ReactionButton variant={ReactionType.Sad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.sad || false}/>
              <ReactionButton variant={ReactionType.Bad} reactionCounts={reactionCounts} setReactionCounts={setReactionCounts} setIsReactionOpen={setIsReactionOpen} postId={postId} fetchUpdatePost={fetchUpdatePost} fetchUpdateReactionStates={fetchUpdateReactionStates} initialIsPushed={getReactionStates(postId)?.states.bad || false}/>
            </CardContent>
          </Card>
        </Popover>
      </>
    );
  }

export default Post;