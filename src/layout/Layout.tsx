import { ReactNode } from "react";
import ButtonMenu from "../uiparts/ButtonMenu";
import { Paper } from "@mui/material";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <>
            <Paper>
                {children}
            </Paper>
            <ButtonMenu />
        </>
    );
}

export default Layout;