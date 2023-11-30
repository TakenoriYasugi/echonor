import { Box, Card, Divider, Typography } from "@mui/material";
import { informationsData } from "./informationsData";

const Informations = () => {
    const sortedInformationsData = informationsData.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        } else {
            return 1;
        }
    });

    return (
        <Card sx={{ maxWidth: 345, p: 2}}>
            <Typography gutterBottom variant="h6" component="div" sx={{textAlign: 'center'}}>
                お知らせ
            </Typography>
            <Divider />
            <Box sx={{maxHeight: "300px", overflowY: "auto"}}>
                {sortedInformationsData.map((data) => (
                    <Card sx={{ p: 1, m: 1 }}>
                        <Typography fontSize={12} variant="body2">
                            {data.date}
                        </Typography>
                        <Typography fontSize={15} variant="body2">
                            {data.content}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Card>
    );
};

export default Informations;