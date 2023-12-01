import { Box, Typography } from "@mui/material";

const GuestBlankPage = () => {
    return (
        <Box sx={{m:1, p: 2, top: 50, left: 0, right: 0, borderRadius: "10px", backgroundColor: "#cceb69"}}>
            <Typography fontSize={12} textAlign={"center"}>
                このページはログインすると使用できます。
            </Typography>
        </Box>
    );
};

export default GuestBlankPage;