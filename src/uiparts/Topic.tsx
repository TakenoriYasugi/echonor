// 集会場に表示するトピック

import { Box, Card, CardContent, Typography } from "@mui/material";
import { TopicType } from "../type/MeetingPlaceType";

const Topic = (props: TopicType) => {
    return (
        <Box sx={{ m: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant="body1">{props.title}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Topic;