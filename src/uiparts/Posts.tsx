import { ReactNode } from "react";
import { PostType, ReactionCounts } from "../type/PostType";
import Post from "./Post";
import { formatDate } from "../util/Format";

// 取得したリストからPostを生成し返却する
const Posts = ({ posts }: { posts: PostType[] }) => {
    return (
        <>
            {posts.map((post) => {
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
                    <Post key={post.postId} id={post.id} postId={post.postId} text={post.content} date={formatDate(post.createdAt)} initialReactionCounts={reactionCounts} />
                );
            })}
        </>
    )
}

export default Posts;