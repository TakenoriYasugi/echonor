/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
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
` as GeneratedQuery<APITypes.GetPostQueryVariables, APITypes.GetPostQuery>;
export const listPosts = /* GraphQL */ `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      postId
      userId
      content
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const getReaction = /* GraphQL */ `query GetReaction($id: ID!) {
  getReaction(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetReactionQueryVariables,
  APITypes.GetReactionQuery
>;
export const listReactions = /* GraphQL */ `query ListReactions(
  $filter: ModelReactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listReactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      userId
      postId
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReactionsQueryVariables,
  APITypes.ListReactionsQuery
>;
export const getTopic = /* GraphQL */ `query GetTopic($id: ID!) {
  getTopic(id: $id) {
    title
    postCount
    createdBy
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTopicQueryVariables, APITypes.GetTopicQuery>;
export const listTopics = /* GraphQL */ `query ListTopics(
  $filter: ModelTopicFilterInput
  $limit: Int
  $nextToken: String
) {
  listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      title
      postCount
      createdBy
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTopicsQueryVariables,
  APITypes.ListTopicsQuery
>;
export const getTopicPost = /* GraphQL */ `query GetTopicPost($id: ID!) {
  getTopicPost(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTopicPostQueryVariables,
  APITypes.GetTopicPostQuery
>;
export const listTopicPosts = /* GraphQL */ `query ListTopicPosts(
  $filter: ModelTopicPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listTopicPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      userId
      content
      to
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTopicPostsQueryVariables,
  APITypes.ListTopicPostsQuery
>;
