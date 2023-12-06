import { Box, Tabs, Tab, Typography } from "@mui/material";
import Topic from "../uiparts/Topic";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
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
                <Box sx={{ pt: 7, pb: 7 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const MeetingPlaceHome = ({ tabValue, handleChange }: { tabValue: number, handleChange: (event: React.SyntheticEvent, newValue: number) => void }) => {

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

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ position: 'fixed', width: '100%', borderBottom: 1, borderColor: 'divider', backgroundColor: "white" }}>
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
            </Box>
        </>
    );
}

export default MeetingPlaceHome;