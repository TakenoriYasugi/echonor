/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreatePost = /* GraphQL */ `subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
  onCreatePost(filter: $filter) {
    postId
    userId
    content
    reactionCounts {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
  onUpdatePost(filter: $filter) {
    postId
    userId
    content
    reactionCounts {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
  onDeletePost(filter: $filter) {
    postId
    userId
    content
    reactionCounts {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateReaction = /* GraphQL */ `subscription OnCreateReaction($filter: ModelSubscriptionReactionFilterInput) {
  onCreateReaction(filter: $filter) {
    userId
    postId
    reactionStates {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateReactionSubscriptionVariables,
  APITypes.OnCreateReactionSubscription
>;
export const onUpdateReaction = /* GraphQL */ `subscription OnUpdateReaction($filter: ModelSubscriptionReactionFilterInput) {
  onUpdateReaction(filter: $filter) {
    userId
    postId
    reactionStates {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateReactionSubscriptionVariables,
  APITypes.OnUpdateReactionSubscription
>;
export const onDeleteReaction = /* GraphQL */ `subscription OnDeleteReaction($filter: ModelSubscriptionReactionFilterInput) {
  onDeleteReaction(filter: $filter) {
    userId
    postId
    reactionStates {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteReactionSubscriptionVariables,
  APITypes.OnDeleteReactionSubscription
>;
export const onCreateTopic = /* GraphQL */ `subscription OnCreateTopic($filter: ModelSubscriptionTopicFilterInput) {
  onCreateTopic(filter: $filter) {
    title
    postCount
    createdBy
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTopicSubscriptionVariables,
  APITypes.OnCreateTopicSubscription
>;
export const onUpdateTopic = /* GraphQL */ `subscription OnUpdateTopic($filter: ModelSubscriptionTopicFilterInput) {
  onUpdateTopic(filter: $filter) {
    title
    postCount
    createdBy
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTopicSubscriptionVariables,
  APITypes.OnUpdateTopicSubscription
>;
export const onDeleteTopic = /* GraphQL */ `subscription OnDeleteTopic($filter: ModelSubscriptionTopicFilterInput) {
  onDeleteTopic(filter: $filter) {
    title
    postCount
    createdBy
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTopicSubscriptionVariables,
  APITypes.OnDeleteTopicSubscription
>;
export const onCreateTopicPost = /* GraphQL */ `subscription OnCreateTopicPost($filter: ModelSubscriptionTopicPostFilterInput) {
  onCreateTopicPost(filter: $filter) {
    userId
    content
    reactionCounts {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    to
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTopicPostSubscriptionVariables,
  APITypes.OnCreateTopicPostSubscription
>;
export const onUpdateTopicPost = /* GraphQL */ `subscription OnUpdateTopicPost($filter: ModelSubscriptionTopicPostFilterInput) {
  onUpdateTopicPost(filter: $filter) {
    userId
    content
    reactionCounts {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    to
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTopicPostSubscriptionVariables,
  APITypes.OnUpdateTopicPostSubscription
>;
export const onDeleteTopicPost = /* GraphQL */ `subscription OnDeleteTopicPost($filter: ModelSubscriptionTopicPostFilterInput) {
  onDeleteTopicPost(filter: $filter) {
    userId
    content
    reactionCounts {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    to
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTopicPostSubscriptionVariables,
  APITypes.OnDeleteTopicPostSubscription
>;
export const onUpdatePostByUserId = /* GraphQL */ `
subscription OnUpdatePostByUserId($userId: String!) {
  onUpdatePost(filter: {userId: {eq: $userId}}) {
    postId
    userId
    content
    reactionCounts {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    __typename
  }
}
` as GeneratedSubscription<
APITypes.OnUpdatePostSubscriptionVariables,
APITypes.OnUpdatePostSubscription>;

export const onUpdateReactionByUserId = /* GraphQL */
 `subscription OnUpdateReactionByUserId($userId: String!) {
  onUpdateReaction(filter: {userId: {eq: $userId}}) {
    userId
    postId
    reactionStates {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateReactionSubscriptionVariables,
  APITypes.OnUpdateReactionSubscription
>;

export const onCreateReactionByUserId = /* GraphQL */ 
`subscription OnCreateReaction($userId: String!) {
  onCreateReaction(filter: {userId: {eq: $userId}}) {
    userId
    postId
    reactionStates {
      good
      heart
      smile
      sad
      bad
      bookmark
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateReactionSubscriptionVariables,
  APITypes.OnCreateReactionSubscription
>;