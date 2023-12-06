import { Box, Tabs, Tab, Typography } from "@mui/material";
import Topic from "../uiparts/Topic";
import { TopicType } from "../type/MeetingPlaceType";

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

    const dummyTopics: TopicType[] = [
        { title: "今週末の不思議な出来事、何が起こった？", createdAt: "2023/10/02 14:30", updatedAt: "2023/10/03 09:15", postCount: 256 },
        { title: "近所のカフェ、秘密のメニュー発見！", createdAt: "2023/10/01 20:45", updatedAt: "2023/10/02 10:20", postCount: 198 },
        { title: "旅行計画、どこに行こうかな？", createdAt: "2023/09/30 23:10", updatedAt: "2023/10/01 08:00", postCount: 340 },
        { title: "週末のDIYプロジェクト、みんなのアイデアは？", createdAt: "2023/09/29 18:20", updatedAt: "2023/09/30 07:45", postCount: 127 },
        { title: "地元の伝説、本当の話？", createdAt: "2023/09/28 16:50", updatedAt: "2023/09/29 09:30", postCount: 489 },
        { title: "健康的な朝食レシピ、共有しよう！", createdAt: "2023/09/27 15:40", updatedAt: "2023/09/28 10:15", postCount: 372 },
        { title: "突然の仕事の休み、どう過ごす？", createdAt: "2023/09/26 12:30", updatedAt: "2023/09/27 11:05", postCount: 214 },
        { title: "【衝撃】昨夜の奇妙な天気、何だったの？", createdAt: "2023/09/25 21:15", updatedAt: "2023/09/26 09:50", postCount: 560 },
        { title: "最近の読書、何を読んでる？", createdAt: "2023/09/24 19:45", updatedAt: "2023/09/25 08:30", postCount: 453 },
        { title: "新しい趣味を探してるんだけど、おすすめは？", createdAt: "2023/09/23 17:50", updatedAt: "2023/09/24 12:20", postCount: 325 },
        { title: "【驚報】地域で見つかった古代の遺物！", createdAt: "2023/09/22 20:40", updatedAt: "2023/09/23 11:15", postCount: 688 },
        { title: "この週末のスポーツイベント、誰が勝つ？", createdAt: "2023/09/21 18:30", updatedAt: "2023/09/22 09:50", postCount: 521 },
        { title: "おしゃれなインテリアのアイデア、教えて！", createdAt: "2023/09/20 22:15", updatedAt: "2023/09/21 08:40", postCount: 146 },
        { title: "自宅でのエクササイズ、効果ある？", createdAt: "2023/09/19 13:10", updatedAt: "2023/09/20 07:55", postCount: 399 },
        { title: "【謎】夜空に浮かぶ謎の光、何だろう？", createdAt: "2023/09/18 15:25", updatedAt: "2023/09/19 10:30", postCount: 230 },
        { title: "ガーデニングのコツ、教えて！", createdAt: "2023/09/17 11:50", updatedAt: "2023/09/18 09:10", postCount: 311 },
        { title: "新発売のガジェット、試してみた？", createdAt: "2023/09/16 14:10", updatedAt: "2023/09/17 08:25", postCount: 283 },
        { title: "仕事のストレス、どうやって解消してる？", createdAt: "2023/09/15 16:45", updatedAt: "2023/09/16 10:05", postCount: 167 },
        { title: "週末の映画鑑賞、何を見る？", createdAt: "2023/09/14 13:35", updatedAt: "2023/09/15 11:50", postCount: 188 },
        { title: "友達との集まり、どこでやる？", createdAt: "2023/09/13 19:20", updatedAt: "2023/09/14 09:40", postCount: 100 }
      ];

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ position: 'fixed', width: '100%', borderBottom: 1, borderColor: 'divider', backgroundColor: "white" , zIndex: 999}}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="常設" {...a11yProps(0)} />
                        <Tab label="最新" {...a11yProps(1)} />
                        <Tab label="人気" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <CustomTabPanel value={tabValue} index={0}>
                    {dummyTopics.map((topic, index) => {
                        return (
                            <Topic key={index} {...topic}/>
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