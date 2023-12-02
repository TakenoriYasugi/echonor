import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import Home from "./Home";
import { API, graphqlOperation } from "aws-amplify";
import dayjs from "dayjs";
import { MAX_POST_COUNT, ReactionCounts } from "../constants/Constants";
import { listPosts, listPostsByKeyWords } from "../graphql/queries";
import Post from "../uiparts/Post";
import { formatDate } from "../util/Format";

const Search = () => {
    const [searchWord, setSearchWord] = useState<string>("")
    const [posts, setPosts] = useState([]);
    const handleSearch = () => {
        fetchPosts(searchWord, MAX_POST_COUNT);
    }

    const fetchPosts = async (keyword: string, limit: number) => {
        try {
          const postData = await API.graphql(graphqlOperation(listPostsByKeyWords, {keyword: keyword, limit: limit}));
          // @ts-ignore
          const posts = postData.data.listPosts.items;
          posts.sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
          setPosts(posts);
        } catch (err) {
          console.error('Error fetching posts', err);
        }
      }

    return (
        <>
            <Box sx={{m: 2, display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <TextField
                    label="検索ワード"
                    variant="outlined"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    sx={{m: 1}} fullWidth/>
                <Button sx={{m: 1}} variant="contained" onClick={handleSearch}>検索</Button>
            </Box>

            <Box sx={{m: 0}}>
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
            </Box>
        </>
    );
}

export default Search;