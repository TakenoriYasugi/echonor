// 集会場に表示するトピック

import { Card, CardActionArea, CardContent, Divider, Stack, Typography } from "@mui/material";
import { TopicType } from "../type/MeetingPlaceType";

const Topic = (props: TopicType) => {
    return (
        <Card sx={{ m: 1 }}>
            <CardActionArea>
                <CardContent>
                    <Typography>{props.title}</Typography>
                </CardContent>
                <Divider />
                <Stack direction="row" justifyContent={"space-evenly"}>
                    <Typography>作成日: {props.createdAt}</Typography>
                    <Typography>最終投稿日: aaa</Typography>
                    <Typography>投稿数: {props.postCount}</Typography>
                </Stack>
            </CardActionArea>
        </Card>
    );
}

export default Topic;