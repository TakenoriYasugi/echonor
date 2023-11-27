
import React from 'react';

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
import DummyPost from './DummyPost';

const DummyPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  },[]);

  const fetchPosts = async () => {
    try {
      const posts = dummyPosts;
      posts.sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      // @ts-ignore
      setPosts(posts);
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  }

    // 通常のSNSに投稿されていそうな他愛のない文章を50件
    const dummyPostContents = [
        "今日は天気がいいから、散歩に出かけようと思います。",
        "昨日試した新しいレシピ、意外とうまくいった！",
        "最近読んだ本が面白かった。おすすめです。",
        "今日のコーヒーは特に美味しい気がする。",
        "週末に友達と映画を見に行く予定。楽しみ！",
        "新しい植物を買って、部屋に置いたら癒される。",
        "昨夜は星がきれいに見えた。夜空は神秘的だ。",
        "最近始めたヨガが心地よくて、すっかりハマってしまった。",
        "猫が隣で丸くなって寝ている。かわいいなぁ。",
        "朝のランニングは気持ちがいい。今日も一日頑張ろう！",
        "この間の旅行で撮った写真を整理している。楽しい思い出だ。",
        "今夜は何を作ろうかな。レシピを探すのも楽しい。",
        "新しいゲームを買ったけど、難しすぎてなかなか進まない。",
        "最近のお気に入りの曲をずっとリピートしている。",
        "友達とのカフェ巡り、最高の休日だった。",
        "昨日の夕焼けが美しかった。自然の色って素晴らしい。",
        "今週末は何も予定がない。ゆっくり休むのも大事だよね。",
        "新しいカメラで撮った写真、なかなかいい感じ。",
        "今日の晩御飯は外食にしよう。何を食べたいかな？",
        "コーヒーを淹れる時間が一日の中で一番落ち着く。",
        "部屋の模様替えをしたら、新鮮な気持ちになれた。",
        "この間の映画、ストーリーが深くて考えさせられた。",
        "昨日の夜更かしはちょっと後悔。今日は早く寝よう。",
        "新しい趣味を見つけたいな。何かいいアイデアはないかな？",
        "子供の頃に読んだ本をまた読み返してみた。懐かしい。",
        "雨の日は家でゆっくり過ごすのが一番。",
        "最近のお気に入りは手作りスムージー。健康にも良さそう。",
        "今日はちょっと疲れたから、早めに休もう。",
        "朝起きたら雪が積もっていた。冬の始まりだ。",
        "家族との時間はいつも心が温まる。",
        "友達がおすすめしてくれた本、読んでみようと思う。",
        "週末に計画しているピクニックが楽しみ。",
        "自分へのご褒美に、新しい洋服を買った。",
        "今日は何もしないで、ただのんびり過ごす日。",
        "昨日見た夢が不思議で面白かった。",
        "好きなバンドの新曲が出るらしい。楽しみにしてる！",
        "仕事の合間に短い散歩。気分転換になる。",
        "新しいレストランを発見。今度行ってみたいな。",
        "朝の光が部屋に差し込むと、一日が始まる感じがする。",
        "最近のマイブームはパズル。集中すると時間を忘れる。",
        "今日の天気予報は晴れ。洗濯日和だ。",
        "友達にもらった手紙を読み返して、ほっこりした気分。",
        "この時期の夕暮れ時が好き。空の色がきれい。",
        "今日は自分に厳しくなりすぎたかも。たまには息抜きも必要だね。",
        "新しい花を植えた。花が咲くのが待ち遠しい。",
        "最近のお気に入りの場所は近くの公園。静かで穏やか。",
        "週末の旅行計画を立てている。どこに行こうかな？",
        "今日は久しぶりに手紙を書いてみた。書くのも楽しい。",
        "この間買ったスニーカー、歩きやすくて最高。"
    ];
    // ダミーデータ
  // Postを生成するために必要なデータを全て含む。
  // 50件のダミーデータを生成する。
  const dummyPosts = [...Array(50)].map((_, i) => {
    return {
    id: i,
    postId: i,
    content: dummyPostContents[i],
    createdAt: dayjs().add(i, 'day').format(),
    // 各パラメータに0から20までの乱数を割り当てる。
    reactionCounts: {
        good: Math.floor(Math.random() * 20),
        heart: Math.floor(Math.random() * 20),
        smile: Math.floor(Math.random() * 20),
        sad: Math.floor(Math.random() * 20),
        bad: Math.floor(Math.random() * 20),
        bookmark: Math.floor(Math.random() * 20)
    }
    }
});
    

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
      {/* @ts-ignore */}
      {posts.map((post: any) => {
        // @ts-ignore
        var reactionCounts: ReactionCounts;

        // @ts-ignore
        if (!post.reactionCounts) {
            // @ts-ignore
            reactionCounts = { good: 0, heart: 0, smile: 0, sad: 0, bad: 0, bookmark: 0 } as ReactionCounts;
        } else {
            reactionCounts = {
            // @ts-ignore
            good: post.reactionCounts.good,
            heart: post.reactionCounts.heart,
            smile: post.reactionCounts.smile,
            sad: post.reactionCounts.sad,
            bad: post.reactionCounts.bad,
            bookmark: post.reactionCounts.bookmark
            } as ReactionCounts;
        }

        return (
            <DummyPost key={post.postId} id={post.id} postId={post.postId} text={post.content} date={formatDate(post.createdAt)} initialReactionCounts={reactionCounts}/>
        );
    })}
      </PullToRefresh>
        <Zoom in={true}>
          <Box sx={{position: "fixed", right: 20, bottom: 80}}>
              <PostFAB fetchPosts={fetchPosts}/>
          </Box>
        </Zoom>
      </>
  );
}

export default DummyPage;
