import styled from "@emotion/styled";
import { Badge } from "@mui/material";
import { informationsData } from "../informations/informationsData";
import { ReactNode, useEffect, useState } from "react";


const InformationBadge = styled(Badge)({
    "& .MuiBadge-badge": {
        backgroundColor: "#FF0000",
        color: "#FF0000",
    }
})

const InformationBadgeComponent = ({children, isInfoUpdated}: {children: ReactNode, isInfoUpdated: boolean}) => {
    return (
        <InformationBadge variant="dot" invisible={!isInfoUpdated}>
            {children}
        </InformationBadge>
    )
}



export default InformationBadgeComponent;