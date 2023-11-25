import Box from "@mui/material/Box";
import Post from "../uiparts/Post";
import PostFAB from "../uiparts/PostFAB";
import Zoom from "@mui/material/Zoom";
import { useContext, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getPost, listPosts } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import PullToRefresh from 'react-simple-pull-to-refresh';
import dayjs from "dayjs";
import { Card, CardContent, Container, Paper, Typography } from "@mui/material";
import { formatDate } from "../util/Format";
import { MAX_POST_COUNT, ReactionCounts } from "../constants/Constants";
import { ReactionStatesListContext } from "../AppWrapper";

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  },[]);

  const fetchPosts = async () => {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts, {limit: MAX_POST_COUNT}));
      // @ts-ignore
      const posts = postData.data.listPosts.items;
      posts.sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      setPosts(posts);
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  }

  // 更新時に表示するテキスト
  const pullingContent = <>
    <Paper sx={{backgroundColor: "#ADD8E6", p: 2}}>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>Refresh</Typography>
        </Container>
    </Paper>
  
  </>

  const reactions = useContext(ReactionStatesListContext);
  return (
      <>
      <PullToRefresh onRefresh={fetchPosts} pullingContent={pullingContent}>
        <>
          {posts.map( (post) => {
            // @ts-ignore
            var reactionCounts: ReactionCounts;

            // @ts-ignore
            if (!post.reactionCounts) {
              // @ts-ignore
              reactionCounts = {good: 0, heart: 0, smile: 0, sad: 0, bad: 0} as ReactionCounts;
            } else {
              reactionCounts = {
              // @ts-ignore
                good: post.reactionCounts.good, heart: post.reactionCounts.heart, smile: post.reactionCounts.smile, sad: post.reactionCounts.sad, bad: post.reactionCounts.bad,
              } as ReactionCounts;
            }

            // @ts-ignore
            return <Post key={post.postId} id={post.id} postId={post.postId} text={post.content} date={formatDate(post.createdAt)} initialReactionCounts={reactionCounts}/>
          })}
        </>
      </PullToRefresh>
        <Zoom in={true}>
          <Box sx={{position: "fixed", right: 20, bottom: 80}}>
              <PostFAB fetchPosts={fetchPosts}/>
          </Box>
        </Zoom>
      </>
  );
}

export default Home;