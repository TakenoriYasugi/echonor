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
export const listPostsByUserId = /* GraphQL */ `query ListPostsByUserId(
  $userId: String
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: {userId: {eq: $userId}}, limit: $limit, nextToken: $nextToken) {
    items {
      postId
      userId
      content
      id
      reactionCounts {
        good
        heart
        smile
        sad
        bad
        bookmark
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;

export const listPostsByPostId = /* GraphQL */ `query ListPostsByPostId(
  $postId: ID!
) {
  listPosts(filter: {postId: {eq: $postId}}) {
    items {
      postId
      userId
      content
      id
      reactionCounts {
        good
        heart
        smile
        sad
        bad
        bookmark
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;


export const listReactionsByUserId = /* GraphQL */ `query ListReactions(
  $userId: String
) {
  listReactions(filter: {userId: {eq: $userId}}) {
    items {
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
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReactionsQueryVariables,
  APITypes.ListReactionsQuery
>;