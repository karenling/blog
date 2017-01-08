const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_POSTS':
      return { ...state, posts: state.posts.concat(action.data.posts || action.data) };
    default:
      return state;
  }
};
