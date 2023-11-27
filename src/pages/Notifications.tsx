// userIdに紐づくPostの更新を監視する。
// 更新があった場合にはuserIdに紐づくPostを再取得し、updatedAtの降順に並び替える。

import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect, useContext } from "react";
import { ReactionStatesListContext } from "../AppWrapper";
import { onUpdatePostByUserId } from "../graphql/subscriptions";
import { GetUserInfo } from "../util/Authenticator";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import Post from "../uiparts/Post";
import { listPostsByUserId } from "../graphql/queries";
import { formatDate } from "../util/Format";
import { ReactionCounts } from "../constants/Constants";

// この際、ReactionCountsが全て0のPostは表示しない。
const Notifications = () => {
    const [usersPosts, setUsersPosts] = useState([]);
    const [user, setUser] = useState();

    useEffect( () => {
        let subscription: ZenObservable.Subscription | undefined;
        GetUserInfo().then((user) => {
          setUser(user);
          subscribePostUpdate(user.username).then((sub) => {
            subscription = sub;
          });
          fetchPosts(user.username);
        });
        return () => {
          if (subscription) {
            subscription.unsubscribe();
          }
        }
      }, []);

    const subscribePostUpdate = async (userId: string) : Promise<ZenObservable.Subscription> => {
        return API.graphql(
        graphqlOperation(onUpdatePostByUserId, { userId: userId })
        // @ts-ignore
        ).subscribe({
        next: (data: any) => {
            console.log('Post updated:', data);
            fetchPosts(userId);
        },
        error: (error: any) => {
            console.error('Error with subscription:', error);
        },
        }) as ZenObservable.Subscription;
    }

    const fetchPosts = async (userId: string) => {
        try {
          const postData = await API.graphql(graphqlOperation(listPostsByUserId, { userId }));
          // @ts-ignore
          const posts = postData.data.listPosts.items;
          const sortedPosts = posts.sort((a: { updatedAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { updatedAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf());
          setUsersPosts(sortedPosts);
        } catch (err) {
          console.error('Error fetching posts', err);
        }
    };

    return (
        <>
            {/* モダンなスタイリング */}
            <Box sx={{m:1, p: 2, top: 50, left: 0, right: 0, borderRadius: "10px", backgroundColor: "#cceb69"}}>
                <Typography fontSize={12} textAlign={"center"}>
                    最近リアクションされたエコーがここに表示されます。
                </Typography>
            </Box>
            {/* @ts-ignore */}
            {usersPosts.map((post: any) => {
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
                    <Post key={post.postId} id={post.id} postId={post.postId} text={post.content} date={formatDate(post.createdAt)} initialReactionCounts={reactionCounts}/>
                );
            })}
        </>
    )

}

export default Notifications;

