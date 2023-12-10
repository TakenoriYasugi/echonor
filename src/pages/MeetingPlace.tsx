import { Box, Zoom } from "@mui/material";
import MeetingPlaceButtonNavigation from "../uiparts/MeetingPlaceButtonNavigation";
import { useState } from "react";
import { ButtonNavigationLabel } from "../constants/Constants";
import React from "react";
import MeetingPlaceHome from "./MeetingPlaceHome";
import AddTopicFAB from "../uiparts/AddTopicFAB";
import UnderConstruction from "./UnderConstruction";

const MeetingPlace = () => {
    const [navigationValue, setNavigationValue] = useState<ButtonNavigationLabel>(ButtonNavigationLabel.Home);
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Box>
                {/* {navigationValue === ButtonNavigationLabel.Home && <MeetingPlaceHome tabValue={tabValue} handleChange={handleChange} />} */}
                {navigationValue === ButtonNavigationLabel.Home && <UnderConstruction />}

            </Box>

            <MeetingPlaceButtonNavigation value={navigationValue} setValue={setNavigationValue} />
        </>
    );
}

export default MeetingPlace;