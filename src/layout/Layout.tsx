import { ReactNode } from "react";
import ButtonMenu from "../uiparts/ButtonMenu";
import { Paper } from "@mui/material";
import { ButtonNavigationLabel } from "../constants/Constants";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <>
            <Paper>
                {children}
            </Paper>
        </>
    );
}

export default Layout;