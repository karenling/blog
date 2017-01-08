export const toggleContactModal = () => ({
  type: 'TOGGLE_CONTACT_MODAL',
});

const updatePosts = data => ({
  type: 'UPDATE_POSTS',
  data,
});

export const fetchPosts = page =>
  (dispatch, getState) => {
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
