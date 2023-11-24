import { z } from "zod";
import { MAX_POST_LENGTH } from "../constants/Constants";

export const PostSchema = z.string().max(MAX_POST_LENGTH);