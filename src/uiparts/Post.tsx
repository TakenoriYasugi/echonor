// タイムラインに流れる投稿

import { Card, CardContent, Grow, Zoom } from "@mui/material";
// import '../css/post.css';
import { useState, useRef, useEffect } from "react";

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
  
    // Growコンポーネントを使用してアニメーションを適用
    return (
      <div ref={cardRef}>
        <Zoom in={checked} style={{ transformOrigin: '0 0 0' }} timeout={1500}>
            <Card className="post" sx={{p: 4, m: 3}}>
                <CardContent>
                    {text}
                </CardContent>
            </Card>
        </Zoom>
      </div>
    );
  }

export default Post;