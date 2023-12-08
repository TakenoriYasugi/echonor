/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createPost = /* GraphQL */ `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePostMutationVariables,
  APITypes.CreatePostMutation
>;
export const updatePost = /* GraphQL */ `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePostMutationVariables,
  APITypes.UpdatePostMutation
>;
export const deletePost = /* GraphQL */ `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePostMutationVariables,
  APITypes.DeletePostMutation
>;
export const createReaction = /* GraphQL */ `mutation CreateReaction(
  $input: CreateReactionInput!
  $condition: ModelReactionConditionInput
) {
  createReaction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateReactionMutationVariables,
  APITypes.CreateReactionMutation
>;
export const updateReaction = /* GraphQL */ `mutation UpdateReaction(
  $input: UpdateReactionInput!
  $condition: ModelReactionConditionInput
) {
  updateReaction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateReactionMutationVariables,
  APITypes.UpdateReactionMutation
>;
export const deleteReaction = /* GraphQL */ `mutation DeleteReaction(
  $input: DeleteReactionInput!
  $condition: ModelReactionConditionInput
) {
  deleteReaction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteReactionMutationVariables,
  APITypes.DeleteReactionMutation
>;
export const createTopic = /* GraphQL */ `mutation CreateTopic(
  $input: CreateTopicInput!
  $condition: ModelTopicConditionInput
) {
  createTopic(input: $input, condition: $condition) {
    title
    postCount
    createdBy
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTopicMutationVariables,
  APITypes.CreateTopicMutation
>;
export const updateTopic = /* GraphQL */ `mutation UpdateTopic(
  $input: UpdateTopicInput!
  $condition: ModelTopicConditionInput
) {
  updateTopic(input: $input, condition: $condition) {
    title
    postCount
    createdBy
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTopicMutationVariables,
  APITypes.UpdateTopicMutation
>;
export const deleteTopic = /* GraphQL */ `mutation DeleteTopic(
  $input: DeleteTopicInput!
  $condition: ModelTopicConditionInput
) {
  deleteTopic(input: $input, condition: $condition) {
    title
    postCount
    createdBy
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTopicMutationVariables,
  APITypes.DeleteTopicMutation
>;
export const createTopicPost = /* GraphQL */ `mutation CreateTopicPost(
  $input: CreateTopicPostInput!
  $condition: ModelTopicPostConditionInput
) {
  createTopicPost(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTopicPostMutationVariables,
  APITypes.CreateTopicPostMutation
>;
export const updateTopicPost = /* GraphQL */ `mutation UpdateTopicPost(
  $input: UpdateTopicPostInput!
  $condition: ModelTopicPostConditionInput
) {
  updateTopicPost(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTopicPostMutationVariables,
  APITypes.UpdateTopicPostMutation
>;
export const deleteTopicPost = /* GraphQL */ `mutation DeleteTopicPost(
  $input: DeleteTopicPostInput!
  $condition: ModelTopicPostConditionInput
) {
  deleteTopicPost(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTopicPostMutationVariables,
  APITypes.DeleteTopicPostMutation
>;
