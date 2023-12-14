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
import { PostType } from "../type/PostType";
import Posts from "../uiparts/Posts";
import InfiniteScroll from 'react-infinite-scroller';
import { isTypeReferenceNode } from "typescript";

const Home = () => {

  const [posts, setPosts] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextToken, setNextToken] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts(true);
  }, []);

  const fetchPosts = async (isRefresh: boolean) => {
    if (isRefresh) {
      try {
        const postData = await API.graphql(graphqlOperation(listPosts, { limit: MAX_POST_COUNT}));
        // @ts-ignore
        const newPosts = postData.data.listPosts.items;
        newPosts.sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        setPosts(newPosts);
        // @ts-ignore
        setHasMore(postData.data.listPosts.nextToken !== null);
        // @ts-ignore
        setNextToken(postData.data.listPosts.nextToken);
      } catch (err) {
        console.error('Error fetching posts', err);
      }
    } else {
      try {
        const postData = await API.graphql(graphqlOperation(listPosts, { limit: MAX_POST_COUNT, nextToken: nextToken }));
        // @ts-ignore
        const newPosts = postData.data.listPosts.items;
        newPosts.sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        setPosts([...posts, ...newPosts]);
        // @ts-ignore
        setHasMore(postData.data.listPosts.nextToken !== null);
        // @ts-ignore
        setNextToken(postData.data.listPosts.nextToken);
      } catch (err) {
        console.error('Error fetching posts', err);
      }
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
    <InfiniteScroll
      loadMore={() => fetchPosts(false)}
      hasMore={hasMore}
      loader={<div key={0}>Loading ...</div>}
    >
      <PullToRefresh onRefresh={() => fetchPosts(true)} pullingContent={pullingContent}>
        <Posts posts={posts} />
      </PullToRefresh>
    </InfiniteScroll>
      <Zoom in={true}>
        <Box sx={{ position: "fixed", right: 20, bottom: 80 }}>
          <PostFAB fetchPosts={fetchPosts} />
        </Box>
      </Zoom>
    </>
  );
}

export default Home;