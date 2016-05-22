(function() {
  if (typeof window.TwinkieandKaren === 'undefined') {
    window.TwinkieandKaren = {};
  }
})();

TwinkieandKaren.setTimezone = function () {
  $.ajax({
    type: 'POST',
    data: { location: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1] },
    url: '/events/set_timezone'
  });
};
