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
                    <Typography fontSize={12}>作成日: <br/>{props.createdAt}</Typography>
                    <Typography fontSize={12}>最終投稿日: <br/>{props.updatedAt}</Typography>
                    <Typography fontSize={12}>投稿数: <br/>{props.postCount}</Typography>
                </Stack>
            </CardActionArea>
        </Card>
    );
}

export default Topic;