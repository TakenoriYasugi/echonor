import { useContext, useEffect, useState } from 'react';
import { ReactionStatesListContext } from '../AppWrapper';
import { API, graphqlOperation } from 'aws-amplify';
import { ReactionCounts } from '../constants/Constants';
import { set } from 'zod';
import Post from '../uiparts/Post';
import { getPost, listPostsByPostId } from '../graphql/queries';
import { formatDate } from '../util/Format';
import dayjs from 'dayjs';

const Bookmarks = () => {
    const reactions = useContext(ReactionStatesListContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const bookmarkedPostIds = reactions.reactionStatesList.filter(
        (reaction) => reaction.states.bookmark === true
      ).map( (bookmarked) => (bookmarked.postId));
      fetchPostByPostIds(bookmarkedPostIds);
    },[]);

    const fetchPostByPostIds = (postIds: string[]) => {
      var tempPosts: any[] = [];
      const postPromises = postIds.map( async (postId) => {
        try {
          const result = await API.graphql(graphqlOperation(listPostsByPostId, {postId: postId}));
          // @ts-ignore
          const postData = result.data.listPosts.items.pop();
          // @ts-ignore
          tempPosts = [...tempPosts, postData];
        } catch (error) {
          console.error('Error fetching posts', error);
        }
      });
      
      Promise.all(postPromises).then(() => {
        const sortedPosts = tempPosts.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        // @ts-ignore
        setPosts(sortedPosts);
      });
    }

    return (
      <>
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
            <Post key={post.postId} id={post.id} postId={post.postId} text={post.content} date={formatDate(post.createdAt)} initialReactionCounts={reactionCounts}/>
          );
        })}
      </>
    );
    
  };
export default Bookmarks;
