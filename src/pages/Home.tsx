import Box from "@mui/material/Box";
import Post from "../uiparts/Post";
import PostFAB from "../uiparts/PostFAB";
import Zoom from "@mui/material/Zoom";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getPost, listPosts } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import PullToRefresh from 'react-simple-pull-to-refresh';
import dayjs from "dayjs";
import { Card, CardContent, Container, Paper, Typography } from "@mui/material";

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  },[]);

  const fetchPosts = async () => {
    try {
      const postData = await API.graphql(graphqlOperation(listPosts));
      // @ts-ignore
      const posts = postData.data.listPosts.items;
      posts.sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      setPosts(posts);
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  }

  const formatDate = (createdAt: string) => {
    return dayjs(createdAt).format("YYYY/MM/DD hh:mm");
  }

  // 更新時に表示するテキスト
  const pullingContent = <>
    <Paper sx={{backgroundColor: "#ADD8E6", p: 2}}>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>Refresh</Typography>
        </Container>
    </Paper>
  
  </>
  return (
      <>
      <PullToRefresh onRefresh={fetchPosts} pullingContent={pullingContent}>
        <>
          {posts.map( (post) => {
            // @ts-ignore
            return <Post key={post.postId} text={post.content} date={formatDate(post.createdAt)}/>
          })}
          {/* {dummyPosts} */}
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

const dummyPosts = (
  <>
    <Post text="今日の空は本当に青いなあ。" date={"2023/10/02"} />
    <Post text="新しいカフェを試してみた。コーヒーが最高！"  date={"2023/10/02"} />
    <Post text="昨夜見た映画が面白すぎた。"  date={"2023/10/02"} />
    <Post text="今週末はハイキングに行こうかな。"  date={"2023/10/02"} />
    <Post text="最近読んだ本がすごくいい。おすすめ！"  date={"2023/10/02"} />
    <Post text="今日のランチは何にしようかな。"  date={"2023/10/02"} />
    <Post text="この曲、ずっと頭の中でリピートされてる…"  date={"2023/10/02"} />
    <Post text="花が咲き始めた！春が来たなあ。"  date={"2023/10/02"} />
    <Post text="週末に友達とビーチに行くのが待ち遠しい！"  date={"2023/10/02"} />
    <Post text="新しいゲームが出るらしい。楽しみ！"  date={"2023/10/02"} />
    <Post text="今日のジョギングは最高の気分転換になった。"  date={"2023/10/02"} />
    <Post text="手作りの料理って、なんでこんなにいいんだろう？"  date={"2023/10/02"} />
    <Post text="仕事で大きなプロジェクトが終わった！達成感あり。"  date={"2023/10/02"} />
    <Post text="今日は何もせずにのんびりしたい気分。"  date={"2023/10/02"} />
    <Post text="子犬の動画を見ていると時間があっという間に過ぎる…"  date={"2023/10/02"} />
    <Post text="このアプリ、使いやすくていいなあ。"  date={"2023/10/02"} />
    <Post text="今日は全然眠れなかった。コーヒー必須。"  date={"2023/10/02"} />
    <Post text="朝の散歩は一日をリフレッシュするのに最適。"  date={"2023/10/02"} />
    <Post text="美味しいお菓子を見つけた！幸せ。"  date={"2023/10/02"} />
    <Post text="週末は何をしようかな。計画を立てるのが楽しい。"  date={"2023/10/02"} />
  </>
);


export default Home;