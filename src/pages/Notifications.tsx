// userIdに紐づくPostの更新を監視する。
// 更新があった場合にはuserIdに紐づくPostを再取得し、updatedAtの降順に並び替える。

import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect, useContext } from "react";
import { ReactionStatesListContext } from "../AppWrapper";
import { onUpdatePostByUserId } from "../graphql/subscriptions";
import { GetUserInfo } from "../util/Authenticator";
import dayjs from "dayjs";
import { ReactionCounts } from "../API";
import { Box, Typography } from "@mui/material";
import Post from "../uiparts/Post";
import { listPostsByUserId } from "../graphql/queries";
import { formatDate } from "../util/Format";

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
            {usersPosts.map((usersPost) => {
                var reactionCounts: ReactionCounts;

                // @ts-ignore
                if (!usersPost.reactionCounts) {
                    // @ts-ignore
                    reactionCounts = {good: 0, heart: 0, smile: 0, sad: 0, bad: 0} as ReactionCounts;
                    } else {
                    reactionCounts = {
                    // @ts-ignore
                        good: usersPost.reactionCounts.good, heart: usersPost.reactionCounts.heart, smile: usersPost.reactionCounts.smile, sad: usersPost.reactionCounts.sad, bad: usersPost.reactionCounts.bad,
                    } as ReactionCounts;
                } 
                if (reactionCounts.good === 0 && reactionCounts.heart === 0 && reactionCounts.smile === 0 && reactionCounts.sad === 0 && reactionCounts.bad === 0) {
                    return <></>
                }
                // @ts-ignore
                return <Post key={usersPost.postId} id={usersPost.id} postId={usersPost.postId} text={usersPost.content} date={formatDate(usersPost.createdAt)} initialReactionCounts={reactionCounts}/>
            })}
        </>
    )

}

export default Notifications;

