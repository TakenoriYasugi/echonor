/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  postId: string,
  userId: string,
  content: string,
  reactionCounts?: ReactionCountsInput | null,
  id?: string | null,
};

export type ReactionCountsInput = {
  good?: number | null,
  heart?: number | null,
  smile?: number | null,
  sad?: number | null,
  bad?: number | null,
  bookmark?: number | null,
};

export type ModelPostConditionInput = {
  postId?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Post = {
  __typename: "Post",
  postId: string,
  userId: string,
  content: string,
  reactionCounts?: ReactionCounts | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type ReactionCounts = {
  __typename: "ReactionCounts",
  good?: number | null,
  heart?: number | null,
  smile?: number | null,
  sad?: number | null,
  bad?: number | null,
  bookmark?: number | null,
};

export type UpdatePostInput = {
  postId?: string | null,
  userId?: string | null,
  content?: string | null,
  reactionCounts?: ReactionCountsInput | null,
  id: string,
};

export type DeletePostInput = {
  id: string,
};

export type CreateReactionInput = {
  userId: string,
  postId: string,
  reactionStates?: ReactionStatesInput | null,
  id?: string | null,
};

export type ReactionStatesInput = {
  good?: boolean | null,
  heart?: boolean | null,
  smile?: boolean | null,
  sad?: boolean | null,
  bad?: boolean | null,
  bookmark?: boolean | null,
};

export type ModelReactionConditionInput = {
  userId?: ModelStringInput | null,
  postId?: ModelStringInput | null,
  and?: Array< ModelReactionConditionInput | null > | null,
  or?: Array< ModelReactionConditionInput | null > | null,
  not?: ModelReactionConditionInput | null,
};

export type Reaction = {
  __typename: "Reaction",
  userId: string,
  postId: string,
  reactionStates?: ReactionStates | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type ReactionStates = {
  __typename: "ReactionStates",
  good?: boolean | null,
  heart?: boolean | null,
  smile?: boolean | null,
  sad?: boolean | null,
  bad?: boolean | null,
  bookmark?: boolean | null,
};

export type UpdateReactionInput = {
  userId?: string | null,
  postId?: string | null,
  reactionStates?: ReactionStatesInput | null,
  id: string,
};

export type DeleteReactionInput = {
  id: string,
};

export type CreateTopicInput = {
  title: string,
  postCount?: number | null,
  createdBy: string,
  id?: string | null,
};

export type ModelTopicConditionInput = {
  title?: ModelStringInput | null,
  postCount?: ModelIntInput | null,
  createdBy?: ModelStringInput | null,
  and?: Array< ModelTopicConditionInput | null > | null,
  or?: Array< ModelTopicConditionInput | null > | null,
  not?: ModelTopicConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Topic = {
  __typename: "Topic",
  title: string,
  postCount?: number | null,
  createdBy: string,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTopicInput = {
  title?: string | null,
  postCount?: number | null,
  createdBy?: string | null,
  id: string,
};

export type DeleteTopicInput = {
  id: string,
};

export type CreateTopicPostInput = {
  userId: string,
  content: string,
  reactionCounts?: ReactionCountsInput | null,
  to?: string | null,
  id?: string | null,
};

export type ModelTopicPostConditionInput = {
  userId?: ModelStringInput | null,
  content?: ModelStringInput | null,
  to?: ModelStringInput | null,
  and?: Array< ModelTopicPostConditionInput | null > | null,
  or?: Array< ModelTopicPostConditionInput | null > | null,
  not?: ModelTopicPostConditionInput | null,
};

export type TopicPost = {
  __typename: "TopicPost",
  userId: string,
  content: string,
  reactionCounts?: ReactionCounts | null,
  to?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTopicPostInput = {
  userId?: string | null,
  content?: string | null,
  reactionCounts?: ReactionCountsInput | null,
  to?: string | null,
  id: string,
};

export type DeleteTopicPostInput = {
  id: string,
};

export type ModelPostFilterInput = {
  postId?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type ModelReactionFilterInput = {
  userId?: ModelStringInput | null,
  postId?: ModelStringInput | null,
  and?: Array< ModelReactionFilterInput | null > | null,
  or?: Array< ModelReactionFilterInput | null > | null,
  not?: ModelReactionFilterInput | null,
};

export type ModelReactionConnection = {
  __typename: "ModelReactionConnection",
  items:  Array<Reaction | null >,
  nextToken?: string | null,
};

export type ModelTopicFilterInput = {
  title?: ModelStringInput | null,
  postCount?: ModelIntInput | null,
  createdBy?: ModelStringInput | null,
  and?: Array< ModelTopicFilterInput | null > | null,
  or?: Array< ModelTopicFilterInput | null > | null,
  not?: ModelTopicFilterInput | null,
};

export type ModelTopicConnection = {
  __typename: "ModelTopicConnection",
  items:  Array<Topic | null >,
  nextToken?: string | null,
};

export type ModelTopicPostFilterInput = {
  userId?: ModelStringInput | null,
  content?: ModelStringInput | null,
  to?: ModelStringInput | null,
  and?: Array< ModelTopicPostFilterInput | null > | null,
  or?: Array< ModelTopicPostFilterInput | null > | null,
  not?: ModelTopicPostFilterInput | null,
};

export type ModelTopicPostConnection = {
  __typename: "ModelTopicPostConnection",
  items:  Array<TopicPost | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionPostFilterInput = {
  postId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionReactionFilterInput = {
  userId?: ModelSubscriptionStringInput | null,
  postId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReactionFilterInput | null > | null,
  or?: Array< ModelSubscriptionReactionFilterInput | null > | null,
};

export type ModelSubscriptionTopicFilterInput = {
  title?: ModelSubscriptionStringInput | null,
  postCount?: ModelSubscriptionIntInput | null,
  createdBy?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTopicFilterInput | null > | null,
  or?: Array< ModelSubscriptionTopicFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionTopicPostFilterInput = {
  userId?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  to?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTopicPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionTopicPostFilterInput | null > | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    postId: string,
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    postId: string,
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    postId: string,
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateReactionMutationVariables = {
  input: CreateReactionInput,
  condition?: ModelReactionConditionInput | null,
};

export type CreateReactionMutation = {
  createReaction?:  {
    __typename: "Reaction",
    userId: string,
    postId: string,
    reactionStates?:  {
      __typename: "ReactionStates",
      good?: boolean | null,
      heart?: boolean | null,
      smile?: boolean | null,
      sad?: boolean | null,
      bad?: boolean | null,
      bookmark?: boolean | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReactionMutationVariables = {
  input: UpdateReactionInput,
  condition?: ModelReactionConditionInput | null,
};

export type UpdateReactionMutation = {
  updateReaction?:  {
    __typename: "Reaction",
    userId: string,
    postId: string,
    reactionStates?:  {
      __typename: "ReactionStates",
      good?: boolean | null,
      heart?: boolean | null,
      smile?: boolean | null,
      sad?: boolean | null,
      bad?: boolean | null,
      bookmark?: boolean | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReactionMutationVariables = {
  input: DeleteReactionInput,
  condition?: ModelReactionConditionInput | null,
};

export type DeleteReactionMutation = {
  deleteReaction?:  {
    __typename: "Reaction",
    userId: string,
    postId: string,
    reactionStates?:  {
      __typename: "ReactionStates",
      good?: boolean | null,
      heart?: boolean | null,
      smile?: boolean | null,
      sad?: boolean | null,
      bad?: boolean | null,
      bookmark?: boolean | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTopicMutationVariables = {
  input: CreateTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type CreateTopicMutation = {
  createTopic?:  {
    __typename: "Topic",
    title: string,
    postCount?: number | null,
    createdBy: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTopicMutationVariables = {
  input: UpdateTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type UpdateTopicMutation = {
  updateTopic?:  {
    __typename: "Topic",
    title: string,
    postCount?: number | null,
    createdBy: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTopicMutationVariables = {
  input: DeleteTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type DeleteTopicMutation = {
  deleteTopic?:  {
    __typename: "Topic",
    title: string,
    postCount?: number | null,
    createdBy: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTopicPostMutationVariables = {
  input: CreateTopicPostInput,
  condition?: ModelTopicPostConditionInput | null,
};

export type CreateTopicPostMutation = {
  createTopicPost?:  {
    __typename: "TopicPost",
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    to?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTopicPostMutationVariables = {
  input: UpdateTopicPostInput,
  condition?: ModelTopicPostConditionInput | null,
};

export type UpdateTopicPostMutation = {
  updateTopicPost?:  {
    __typename: "TopicPost",
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    to?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTopicPostMutationVariables = {
  input: DeleteTopicPostInput,
  condition?: ModelTopicPostConditionInput | null,
};

export type DeleteTopicPostMutation = {
  deleteTopicPost?:  {
    __typename: "TopicPost",
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    to?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    postId: string,
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      postId: string,
      userId: string,
      content: string,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReactionQueryVariables = {
  id: string,
};

export type GetReactionQuery = {
  getReaction?:  {
    __typename: "Reaction",
    userId: string,
    postId: string,
    reactionStates?:  {
      __typename: "ReactionStates",
      good?: boolean | null,
      heart?: boolean | null,
      smile?: boolean | null,
      sad?: boolean | null,
      bad?: boolean | null,
      bookmark?: boolean | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReactionsQueryVariables = {
  filter?: ModelReactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReactionsQuery = {
  listReactions?:  {
    __typename: "ModelReactionConnection",
    items:  Array< {
      __typename: "Reaction",
      userId: string,
      postId: string,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTopicQueryVariables = {
  id: string,
};

export type GetTopicQuery = {
  getTopic?:  {
    __typename: "Topic",
    title: string,
    postCount?: number | null,
    createdBy: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTopicsQueryVariables = {
  filter?: ModelTopicFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTopicsQuery = {
  listTopics?:  {
    __typename: "ModelTopicConnection",
    items:  Array< {
      __typename: "Topic",
      title: string,
      postCount?: number | null,
      createdBy: string,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTopicPostQueryVariables = {
  id: string,
};

export type GetTopicPostQuery = {
  getTopicPost?:  {
    __typename: "TopicPost",
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    to?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTopicPostsQueryVariables = {
  filter?: ModelTopicPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTopicPostsQuery = {
  listTopicPosts?:  {
    __typename: "ModelTopicPostConnection",
    items:  Array< {
      __typename: "TopicPost",
      userId: string,
      content: string,
      to?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    postId: string,
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    postId: string,
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    postId: string,
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateReactionSubscriptionVariables = {
  filter?: ModelSubscriptionReactionFilterInput | null,
};

export type OnCreateReactionSubscription = {
  onCreateReaction?:  {
    __typename: "Reaction",
    userId: string,
    postId: string,
    reactionStates?:  {
      __typename: "ReactionStates",
      good?: boolean | null,
      heart?: boolean | null,
      smile?: boolean | null,
      sad?: boolean | null,
      bad?: boolean | null,
      bookmark?: boolean | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateReactionSubscriptionVariables = {
  filter?: ModelSubscriptionReactionFilterInput | null,
};

export type OnUpdateReactionSubscription = {
  onUpdateReaction?:  {
    __typename: "Reaction",
    userId: string,
    postId: string,
    reactionStates?:  {
      __typename: "ReactionStates",
      good?: boolean | null,
      heart?: boolean | null,
      smile?: boolean | null,
      sad?: boolean | null,
      bad?: boolean | null,
      bookmark?: boolean | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteReactionSubscriptionVariables = {
  filter?: ModelSubscriptionReactionFilterInput | null,
};

export type OnDeleteReactionSubscription = {
  onDeleteReaction?:  {
    __typename: "Reaction",
    userId: string,
    postId: string,
    reactionStates?:  {
      __typename: "ReactionStates",
      good?: boolean | null,
      heart?: boolean | null,
      smile?: boolean | null,
      sad?: boolean | null,
      bad?: boolean | null,
      bookmark?: boolean | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTopicSubscriptionVariables = {
  filter?: ModelSubscriptionTopicFilterInput | null,
};

export type OnCreateTopicSubscription = {
  onCreateTopic?:  {
    __typename: "Topic",
    title: string,
    postCount?: number | null,
    createdBy: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTopicSubscriptionVariables = {
  filter?: ModelSubscriptionTopicFilterInput | null,
};

export type OnUpdateTopicSubscription = {
  onUpdateTopic?:  {
    __typename: "Topic",
    title: string,
    postCount?: number | null,
    createdBy: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTopicSubscriptionVariables = {
  filter?: ModelSubscriptionTopicFilterInput | null,
};

export type OnDeleteTopicSubscription = {
  onDeleteTopic?:  {
    __typename: "Topic",
    title: string,
    postCount?: number | null,
    createdBy: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTopicPostSubscriptionVariables = {
  filter?: ModelSubscriptionTopicPostFilterInput | null,
};

export type OnCreateTopicPostSubscription = {
  onCreateTopicPost?:  {
    __typename: "TopicPost",
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    to?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTopicPostSubscriptionVariables = {
  filter?: ModelSubscriptionTopicPostFilterInput | null,
};

export type OnUpdateTopicPostSubscription = {
  onUpdateTopicPost?:  {
    __typename: "TopicPost",
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    to?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTopicPostSubscriptionVariables = {
  filter?: ModelSubscriptionTopicPostFilterInput | null,
};

export type OnDeleteTopicPostSubscription = {
  onDeleteTopicPost?:  {
    __typename: "TopicPost",
    userId: string,
    content: string,
    reactionCounts?:  {
      __typename: "ReactionCounts",
      good?: number | null,
      heart?: number | null,
      smile?: number | null,
      sad?: number | null,
      bad?: number | null,
      bookmark?: number | null,
    } | null,
    to?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
