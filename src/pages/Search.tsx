import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Home from "./Home";
import { API, graphqlOperation } from "aws-amplify";
import dayjs from "dayjs";
import { MAX_POST_COUNT, ReactionCounts } from "../constants/Constants";
import { listPosts, listPostsByKeyWords } from "../graphql/queries";
import Post from "../uiparts/Post";
import { formatDate } from "../util/Format";
import { set } from "zod";
import { GraphQLResult } from "@aws-amplify/api";
import Observable from "zen-observable";

const Search = () => {
    const [searchWords, setSearchWords] = useState<string>("")
    const [posts, setPosts] = useState([]);
    const [searchMode, setSearchMode] = useState<"and" | "or">("and");
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const handleSearchModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchMode((event.target as HTMLInputElement).value as "and" | "or");
    };

    const handleSearch = () => {
        
        // searchWordsを半角、全角スペースで区切って、配列にする
        const searchWordsArray = searchWords.split(/[\s　]+/);

        // searchWordsArrayから、全角スペース、半角スペース、空文字を削除する
        for (let i = 0; i < searchWordsArray.length; i++) {
            if (searchWordsArray[i] === "" || searchWordsArray[i] === " " || searchWordsArray[i] === "　") {
                searchWordsArray.splice(i, 1);
                i--;
            }
        }

        // 配列の中身が空の場合、何もしない。
        if (searchWordsArray.length === 0) {
            setPosts([]);
            return;
        }

        fetchPosts(searchWordsArray, MAX_POST_COUNT);
    }

    const fetchPosts = async (searchWordsArray: string[], limit: number) => {
        try {
            const keyword = searchWordsArray[0];
            let postData: GraphQLResult<any> | Observable<object> | undefined;
            if (searchMode === "and") {
                postData = await API.graphql(graphqlOperation(listPostsByKeyWords, {keyword: keyword, limit: limit}));
            } else {
                postData = await API.graphql(graphqlOperation(listPosts, {limit: limit}));
            }
            // @ts-ignore
            const posts = postData.data.listPosts.items;
            posts.sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
            /* postsから、contentにsearchWordsArrayの単語を含むもののみをfilterする */
            if (searchMode === "and") {
                console.log("and");
                console.log(searchWordsArray);
                const filteredPosts = posts.filter((post: any) => {
                    const content = post.content;
                    for (const searchWord of searchWordsArray) {
                        if (content.includes(searchWord)) {
                            continue;
                        } else {
                            return false;
                        }
                    }
                    return true;
                });
                setPosts(filteredPosts);
            } else {
                console.log("or");
                console.log(searchWordsArray)
                const filteredPosts = posts.filter((post: any) => {
                    const content = post.content;
                    for (const searchWord of searchWordsArray) {
                        if (content.includes(searchWord)) {
                            return true;
                        }
                    }
                    return false;
                });
                setPosts(filteredPosts);
            }
            setIsSearched(true);
        } catch (err) {
          console.error('Error fetching posts', err);
        }
      }

      const resultInfo = <>
        <Box sx={{m:1, p: 2, top: 50, left: 0, right: 0, borderRadius: "10px", backgroundColor: "#cceb69"}}>
            <Typography fontSize={12} textAlign={"center"}>
                検索結果が見つかりませんでした。キーワードを変えて再度検索してください。
            </Typography>
        </Box>
      </>

    return (
        <>
            <Box sx={{m: 2, display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <TextField
                    label="検索ワード"
                    variant="outlined"
                    value={searchWords}
                    onChange={(e) => setSearchWords(e.target.value)}
                    sx={{m: 1}} fullWidth/>
                <Button sx={{m: 1}} variant="contained" onClick={handleSearch}>検索</Button>
            </Box>
            <Box sx={{m: 2, ml: 4}}>
                <FormControl>
                    <FormLabel>検索設定</FormLabel>
                    <RadioGroup
                        row
                        value={searchMode}
                        onChange={handleSearchModeChange}>
                        <FormControlLabel value="and" control={<Radio />} label="AND" />
                        <FormControlLabel value="or" control={<Radio />} label="OR" />
                    </RadioGroup>
                </FormControl>
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

                {isSearched && posts.length === 0 && resultInfo}
            </Box>
        </>
    );
}

export default Search;