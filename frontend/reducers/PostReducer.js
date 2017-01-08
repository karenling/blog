import ReactGA from 'react-ga';

ReactGA.initialize('UA-4234175-15');

const initialState = {
  posts: {},
  totalPosts: 0,
  totalPages: 0,
  currentPage: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ROUTER_LOCATION_CHANGED': {
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
      return state;
    }
    case 'UPDATE_POSTS': {
      const posts = state.posts;
      const data = action.data.posts || [action.data];
      data.forEach((post) => {
        posts[post.friendly_name] = post;
      });
      // TODO: not sure if we really need to keep track of the total posts
      const totalPosts = action.data.total_posts || state.totalPosts;
      const totalPages = action.data.total_pages || state.totalPages;
      return { ...state, posts, totalPosts, totalPages };
    }
    default:
      return state;
  }
};
