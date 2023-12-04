import Box from "@mui/material/Box";
import PostFAB from "../uiparts/PostFAB";
import Zoom from "@mui/material/Zoom";
import { useContext, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../graphql/queries";
import PullToRefresh from 'react-simple-pull-to-refresh';
import dayjs from "dayjs";
import { Container, Paper, Typography } from "@mui/material";
import { MAX_POST_COUNT } from "../constants/Constants";
import { ReactionStatesListContext } from "../AppWrapper";
import AdMax from "../uiparts/AdMax";
import { PostType } from "../type/PostType";
import Posts from "../uiparts/Posts";

const Home = () => {

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts, { limit: MAX_POST_COUNT }));
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
    <Paper sx={{ backgroundColor: "#ADD8E6", p: 2 }}>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Refresh</Typography>
      </Container>
    </Paper>

  </>

  const reactions = useContext(ReactionStatesListContext);
  return (
    <>
      <AdMax />
      <PullToRefresh onRefresh={fetchPosts} pullingContent={pullingContent}>
        <Posts posts={posts} />
      </PullToRefresh>
      <Zoom in={true}>
        <Box sx={{ position: "fixed", right: 20, bottom: 80 }}>
          <PostFAB fetchPosts={fetchPosts} />
        </Box>
      </Zoom>
    </>
  );
}

export default Home;