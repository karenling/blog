export const toggleContactModal = () => ({
  type: 'TOGGLE_CONTACT_MODAL',
});

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
