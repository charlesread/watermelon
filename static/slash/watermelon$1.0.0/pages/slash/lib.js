$(document).ready(function () {
  $('#buttonLogin').click(function () {
    window.location.replace('/register');
  });
});

function sendPlaceInfo(elem, message) {
  elem.removeClass('btn-outline-info').addClass('btn-outline-warning').html('Sending...');
  $.ajax({
    url: '/api/sms/out/self',
    type: 'post',
    dataType: 'json',
    data: JSON.stringify({message}),
    contentType: 'application/json',
    complete: function (xhr, status) {
      if (xhr.status === 200) {
        elem.removeClass('btn-outline-info').removeClass('btn-outline-warning').addClass('btn-outline-success').html('Sent!');
      } else {
        elem.removeClass('btn-outline-info').removeClass('btn-outline-warning').addClass('btn-outline-danger').html('Hey you have to log in for that to work!');
      }
    }
  });
}
