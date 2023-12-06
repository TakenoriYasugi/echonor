// 集会場に表示するトピック

import { Box, Card, CardContent, Typography } from "@mui/material";

const Topic = ({ title }: { title: string }) => {
    return (
        <Box sx={{ m: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant="body1">{title}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Topic;