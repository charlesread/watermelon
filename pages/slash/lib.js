// alert('Welcome!');

socket.on('handshake', function (data) {
  console.log('received `greeting` from server');
  $('#handshake').html(data.message);
});

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
      elem.removeClass('btn-outline-info').removeClass('btn-outline-warning').addClass('btn-outline-success').html('Sent!');
    }
  });
}
