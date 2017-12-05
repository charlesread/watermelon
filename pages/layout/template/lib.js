var socket = io();

function showAlert (elem, type, message, dismissTime) {
  console.log(elem);
  elem.hide();
  elem.html(message || 'Oops, sorry, something went wrong.');
  elem.addClass('alert-' + type || 'danger');
  elem.show();
  setTimeout(function () {
    elem.hide();
    elem.removeClass('alert-' + type || 'danger');
  }, dismissTime || 5000);
}