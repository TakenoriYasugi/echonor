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
import { PostType } from "../type/PostType";
import Posts from "../uiparts/Posts";
import RemarksCard from "../uiparts/RemarksCard";

// この際、ReactionCountsが全て0のPostは表示しない。
const Notifications = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
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
          const blankCounts = { good: 0, heart: 0, smile: 0, sad: 0, bad: 0, bookmark: 0 };
          const reactionedPosts = posts.filter((post: any) => {
            
            // 定義されていない場合は全て0とする。
            const reactionCounts: ReactionCounts = post.reactionCounts ? post.reactionCounts : blankCounts;
            return reactionCounts.good > 0 || reactionCounts.heart > 0 || reactionCounts.smile > 0 || reactionCounts.sad > 0 || reactionCounts.bad > 0 || reactionCounts.bookmark > 0;
          });
          const sortedPosts = reactionedPosts.sort((a: { updatedAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { updatedAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf());
          setPosts(sortedPosts);
        } catch (err) {
          console.error('Error fetching posts', err);
        }
    };

    return (
        <>
            <RemarksCard>
                最近リアクションされたエコーがここに表示されます。
            </RemarksCard>
            <Posts posts={posts}/>
        </>
    )

}

export default Notifications;

