import { createSelector } from 'reselect';

export const postSelector = createSelector(
  state => state,
  state => (
    state.posts.posts.find(post => post.friendly_name === state.router.params.id)
  ),

);
