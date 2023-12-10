import { z } from "zod";
import { MAX_POST_LENGTH, MAX_TOPIC_TITLE_LENGTH } from "../constants/Constants";

export const PostSchema = z.string().max(MAX_POST_LENGTH);
export const TopicTitleSchema = z.string().max(MAX_TOPIC_TITLE_LENGTH);