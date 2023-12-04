import { useContext, useEffect, useState } from 'react';
import { ReactionStatesListContext } from '../AppWrapper';
import { API, graphqlOperation } from 'aws-amplify';
import { listPostsByPostId } from '../graphql/queries';
import dayjs from 'dayjs';
import { PostType } from '../type/PostType';
import Posts from '../uiparts/Posts';

const Bookmarks = () => {
    const reactions = useContext(ReactionStatesListContext);
    const [posts, setPosts] = useState<PostType[]>([]);

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
        <Posts posts={posts}/>
      </>
    );
    
  };
export default Bookmarks;
