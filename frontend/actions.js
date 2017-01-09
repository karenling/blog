import { orderPostsSelector } from './selectors';

export const toggleContactModal = () => ({
  type: 'TOGGLE_CONTACT_MODAL',
});

const updatePosts = data => ({
  type: 'UPDATE_POSTS',
  data,
});

const loadingPosts = () => ({
  type: 'LOADING_POSTS',
});

export const fetchPosts = pg =>
  (dispatch, getState) => {
    const page = pg || parseInt(getState().router.params.page, 10) || 1;
    const selectedPosts = orderPostsSelector(getState());
    const lastPost = selectedPosts[selectedPosts.length - 1];

    if (selectedPosts.length > 0 && lastPost.page !== 1 && lastPost.page === page) {
      // check if we have the pages before we make the request
      // must have selectedPosts
      // if the last post is on first page,
      // we'll fetch all in case user comes from permalink and clicks home
      // if the last post page belongs to the current page num, we don't need to fetch
      return;
    }

    dispatch(loadingPosts());
    $.ajax({
      type: 'GET',
      url: '/api/posts',
      data: { page },
      success(data) {
        dispatch(updatePosts(data));
      },
      error() {
        console.log('error')
      },
    });
  };

export const fetchPost = () =>
  (dispatch, getState) => {
    const id = getState().router.params.id;

    if (getState().posts.posts[id]) {
      return;
    }

    dispatch(loadingPosts());
    $.ajax({
      type: 'GET',
      url: `/api/posts/${id}`,
      dataType: 'JSON',
      success(post) {
        dispatch(updatePosts(post));
      },
      error() {
        console.log('error');
      },
    });
  };

export const sendMessage = (formData, success, error) =>
  () => {
    $.ajax({
      type: 'POST',
      url: '/api/send_contact',
      data: formData,
      success,
      error,
    });
  };
