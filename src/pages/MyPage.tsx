import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { GetUserInfo } from "../util/Authenticator";
import { useEffect, useState } from "react";
import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import dayjs from "dayjs";
import { getPost, listPosts, listPostsByUserId} from "../graphql/queries";
import { useUser } from "../util/UserProvider";
import Post from "../uiparts/Post";
import { formatDate } from "../util/Format";

function MyPage() {

  const [usersPosts, setUsersPosts] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    GetUserInfo().then((user) => {
      setUser(user);
      // @ts-ignore
      fetchPosts(user.username);
    });
  }, []);

  useEffect(() => {
    console.log("Got Posts. : " + usersPosts);
  }, [usersPosts]);


  const fetchPosts = async (userId: string) => {
    try {
      // @ts-ignore
      const postData = await API.graphql(graphqlOperation(listPostsByUserId, { userId }));
      // @ts-ignore
      const posts = postData.data.listPosts.items;
      posts.sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }, b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      setUsersPosts(posts);
    } catch (err) {
      console.error('Error fetching posts', err);
    }
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="自分の投稿" {...a11yProps(0)} />
            <Tab label="リアクション" {...a11yProps(1)} />
            <Tab label="ブックマーク" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {usersPosts.map((usersPost) => (
            // @ts-ignore
            <Post key={usersPost.postId} text={usersPost.content} date={formatDate(usersPost.createdAt)} />
          ))}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </>

  );
}

export default MyPage;