// タイムラインに流れる投稿

import { Card, CardContent, Divider, Grow, IconButton, Zoom } from "@mui/material";
// import '../css/post.css';
import { useState, useRef, useEffect } from "react";

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Post = ({text} : {text: string}) => {

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
    
    // Zoomコンポーネントを使用してアニメーションを適用
    return (
      <div ref={cardRef}>
        <Zoom in={checked} style={{ transformOrigin: "left" }} timeout={800}>
            <Card className="post" sx={{p: 2, m: 3}}>
                <CardContent>
                    {text}
                </CardContent>
                <Divider/>
                <IconButton><ThumbUpAltIcon/></IconButton>
                <IconButton><EmojiEmotionsIcon/></IconButton>
                <IconButton><SentimentVeryDissatisfiedIcon/></IconButton>
                <IconButton><ThumbDownAltIcon/></IconButton>


            </Card>
        </Zoom>
      </div>
    );
  }

export default Post;