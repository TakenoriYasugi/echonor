import { Container, CircularProgress, Typography, Stack } from "@mui/material";

const Loading = () => {
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
            <Stack
                direction="column"
                spacing={1}
                alignItems={"center"}
            >    
                <CircularProgress />
                <Typography alignContent={"center"}>Loading.....</Typography>
            </Stack>
        </Container>
    );
};

export default Loading;