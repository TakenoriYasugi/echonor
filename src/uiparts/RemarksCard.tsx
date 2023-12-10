import { Box, Typography } from "@mui/material"
import { ReactNode } from "react";

// 背景色をつけた注釈
const RemarksCard = ({children}: {children: ReactNode}) => {
    return (
        <Box sx={{ m: 1, p: 2, top: 50, left: 0, right: 0, borderRadius: "10px", backgroundColor: "#cceb69" }}>
            <Typography fontSize={12} textAlign={"center"}>
                {children}
            </Typography>
        </Box>
    )
}

export default RemarksCard;