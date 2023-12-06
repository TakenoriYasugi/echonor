import { Box, Card, CardContent, Typography } from "@mui/material";
import RemarksCard from "../uiparts/RemarksCard";
import MeetingPlaceButtonNavigation from "../uiparts/MeetingPlaceButtonNavigation";
import { useState } from "react";
import { ButtonNavigationLabel } from "../constants/Constants";
import Topic from "../uiparts/Topic";
import TopicIcon from '@mui/icons-material/Topic';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MeetingPlace = () => {
    const [navigationValue, setNavigationValue] = useState<ButtonNavigationLabel>(ButtonNavigationLabel.Home);
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const dummyTopic: string[] = [
        "あなたの「恥ずかしい失敗談」を共有しよう！",
        "「最悪のデート体験」を教えて！",
        "有名人のゴシップ話：最新のうわさは？",
        "「職場での奇妙な出来事」：あなたの体験談を聞かせて！",
        "「最もひどい贈り物」：誰かにもらった最悪のプレゼントは？",
        "「驚くほどの偶然の出来事」：あなたの信じられない偶然体験は？",
        "「バカバカしい賭け」：参加したことのある一番馬鹿げた賭けは何？",
        "「猫か犬か」：あなたはどっち派？理由も教えて！",
        "「最も恥ずかしい学校での思い出」：あなたの学生時代の恥ずかしい話は？",
        "「意外な趣味を持っている有名人」：知っている意外な事実は？"
    ];

    const home = <>
        <Box sx={{ width: '100%' }}>
            <Box sx={{position: 'fixed', width: '100%', borderBottom: 1, borderColor: 'divider', backgroundColor: "white"}}>
                <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="常設" {...a11yProps(0)} />
                    <Tab label="最新" {...a11yProps(1)} />
                    <Tab label="人気" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={tabValue} index={0}>
                {dummyTopic.map((topic, index) => {
                    return (
                        <Topic key={index} title={topic} />
                    );
                })}
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
                Item Three
            </CustomTabPanel>
        </Box>`
    </>

    return (
        <>
            <Box>
                {navigationValue === ButtonNavigationLabel.Home && home}

            </Box>

            <MeetingPlaceButtonNavigation value={navigationValue} setValue={setNavigationValue} />
        </>
    );
}

export default MeetingPlace;