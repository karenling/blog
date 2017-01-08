import { createSelector } from 'reselect';

export const postSelector = createSelector(
  state => state.posts,
  state => state.router,
  (posts, router) => posts.posts[router.params.id],
);

// sorts by post date and returns array
export const orderPostsSelector = createSelector(
  state => state.posts,
  (posts) => {
    let orderedPosts = [];
    Object.keys(posts.posts).sort().reverse().forEach((id) => {
      orderedPosts = orderedPosts.concat(posts.posts[id]);
    });
    return orderedPosts;
  },
);
