import { ReactNode } from "react";
import ButtonMenu from "../uiparts/ButtonMenu";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <>
            {children}
            <ButtonMenu />
        </>
    );
}

export default Layout;