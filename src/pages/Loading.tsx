import { Container, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <CircularProgress />
        </Container>
    );
};

export default Loading;