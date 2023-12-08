import { useParams } from "react-router-dom";

const TopicDiscussionPage = () => {
    const { topicId } = useParams();
    return <div>TopicDiscussionPage: {topicId}</div>;
}

export default TopicDiscussionPage;