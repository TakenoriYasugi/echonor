// 集会場に表示するトピック

import { Card, CardActionArea, CardContent, Divider, Stack, Typography } from "@mui/material";
import { TopicType } from "../type/MeetingPlaceType";
import { formatDate } from "../util/Format";
import { useNavigate } from "react-router-dom";

const Topic = (props: TopicType) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/meetingplace/topic/' + props.id);
    }
    return (
        <Card sx={{ m: 1 }}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography>{props.title}</Typography>
                </CardContent>
                <Divider />
                <Stack direction="row">
                    <Typography sx={{ml: 2}} fontSize={12}>作成日時: <br/>{formatDate(props.createdAt)}</Typography>
                    <Typography sx={{ml: 2}} fontSize={12}>更新日時: <br/>{formatDate(props.updatedAt)}</Typography>
                    <Typography sx={{ml: 2}} fontSize={12}>投稿数: <br/>{props.postCount ?? 1}</Typography>
                </Stack>
            </CardActionArea>
        </Card>
    );
}

export default Topic;