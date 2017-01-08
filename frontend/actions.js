import { orderPostsSelector } from './selectors';

export const toggleContactModal = () => ({
  type: 'TOGGLE_CONTACT_MODAL',
});

const updatePosts = data => ({
  type: 'UPDATE_POSTS',
  data,
});

export const fetchPosts = () =>
  (dispatch, getState) => {
    const page = parseInt(getState().router.params.page, 10) || 1;

    const selectedPages = orderPostsSelector(getState());
    if (selectedPages.length > 0 && selectedPages[0].page === page) {
      // check if we have the pages before we make the request
      return;
    }

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
