import Box from "@mui/material/Box";
import Post from "../uiparts/Post";
import PostFAB from "../uiparts/PostFAB";
import Zoom from "@mui/material/Zoom";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getPost, listPosts } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";

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
      setPosts(posts);
      console.log(posts);
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  }

  return (
      <>
        {posts.map( (post) => {
          // @ts-ignore
          console.log(post.content);
          // @ts-ignore
          return <Post key={post.postId} text={post.content}/>
        })}
        {/* {dummyPosts} */}
        <Zoom in={true}>
          <Box sx={{position: "fixed", right: 20, bottom: 80}}>
              <PostFAB/>
          </Box>
        </Zoom>
      </>
  );
}

const dummyPosts = (
  <>
    <Post text="今日の空は本当に青いなあ。" />
    <Post text="新しいカフェを試してみた。コーヒーが最高！" />
    <Post text="昨夜見た映画が面白すぎた。" />
    <Post text="今週末はハイキングに行こうかな。" />
    <Post text="最近読んだ本がすごくいい。おすすめ！" />
    <Post text="今日のランチは何にしようかな。" />
    <Post text="この曲、ずっと頭の中でリピートされてる…" />
    <Post text="花が咲き始めた！春が来たなあ。" />
    <Post text="週末に友達とビーチに行くのが待ち遠しい！" />
    <Post text="新しいゲームが出るらしい。楽しみ！" />
    <Post text="今日のジョギングは最高の気分転換になった。" />
    <Post text="手作りの料理って、なんでこんなにいいんだろう？" />
    <Post text="仕事で大きなプロジェクトが終わった！達成感あり。" />
    <Post text="今日は何もせずにのんびりしたい気分。" />
    <Post text="子犬の動画を見ていると時間があっという間に過ぎる…" />
    <Post text="このアプリ、使いやすくていいなあ。" />
    <Post text="今日は全然眠れなかった。コーヒー必須。" />
    <Post text="朝の散歩は一日をリフレッシュするのに最適。" />
    <Post text="美味しいお菓子を見つけた！幸せ。" />
    <Post text="週末は何をしようかな。計画を立てるのが楽しい。" />
  </>
);


export default Home;