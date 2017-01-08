const initialState = {
  posts: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_POSTS': {
      const posts = state.posts;
      const data = action.data.posts || [action.data];
      data.forEach((post) => {
        posts[post.friendly_name] = post;
      });
      return { ...state, posts };
    }
    default:
      return state;
  }
};
