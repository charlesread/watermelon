// alert('Welcome!');

socket.on('handshake', function(data) {
  console.log('received `greeting` from server');
  $('#handshake').html(data.message);
});

$(document).ready(function () {
  $('#buttonLogin').click(function () {
    window.location.replace('/register');
  });
});