

const ReactionedPostsStore = configureStore();

const GetReactionList = (userId) => ({
  type: "GET_REACTION_LIST",
  reactions
});

const GetReactionStates = (userId, postId) => ({
  type: "GET_REACTION_STATES",
  states
});

const ReactionReducer = (state = [], action) => {
  switch(action.type) {
    case GET_REACTION_LIST:
      return state;

    case GET_REACTIONSTATES:
      return state;

    default:
      return state;
  }
}

const store = createStore(
  ReactionReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
