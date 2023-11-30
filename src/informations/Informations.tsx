import { Box, Card, Typography } from "@mui/material";
import { informationsData } from "./informationsData";

const Informations = () => {
    return (
        <Card sx={{ maxWidth: 345, p: 2}}>
            <Typography gutterBottom variant="h5" component="div">
                お知らせ
            </Typography>
            <Box sx={{maxHeight: "300px", overflowY: "auto"}}>
                {informationsData.map((data) => (
                    <Typography fontSize={15} variant="body2" color="text.secondary">
                        {data.date}{data.content}
                    </Typography>
                ))}
            </Box>
        </Card>
    );
};

export default Informations;