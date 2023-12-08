import { API, graphqlOperation } from "aws-amplify";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MAX_POST_COUNT } from "../constants/Constants";
import { getTopic, listPosts } from "../graphql/queries";
import { TopicType } from "../type/MeetingPlaceType";
import { Typography } from "@mui/material";

const TopicDiscussionPage = () => {
    const { topicId } = useParams();
    const [topicInfo, setTopicInfo] = useState<TopicType>();

    useEffect(() => {
        fetchTopic();
    }, []);

    const fetchTopic = async () => {
        try {
            const topicData = await API.graphql(graphqlOperation(getTopic, { id: topicId }));
            // @ts-ignore
            const topic = topicData.data.getTopic;
            setTopicInfo(topic);
        } catch (err) {
            console.error('Error fetching posts', err);
        }
    }

    return <>
        <Typography variant="h6" sx={{m: 2}}>{topicInfo?.title}</Typography>
        
    </>
}
export default TopicDiscussionPage;