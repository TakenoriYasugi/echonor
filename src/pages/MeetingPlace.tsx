import { Box, Typography } from "@mui/material";
import RemarksCard from "../uiparts/RemarksCard";

const MeetingPlace = () => {
    return (
        <>
            <Box sx={{m: 2}}>
                <Typography variant="h6">集会場</Typography>
            </Box>

            <Box sx={{m: 2}}>
                <RemarksCard>
                    集会場では１つのトピックについて、ユーザー同士で自由に会話をすることができます。
                    以下のルールを守って、楽しく交流しましょう。
                </RemarksCard>
            </Box>
        </>
    );
}

export default MeetingPlace;