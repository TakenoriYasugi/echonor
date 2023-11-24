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
