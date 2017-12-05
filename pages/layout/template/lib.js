var socket = io();

function showAlert(elem, type, message, dismissTime) {
  elem.hide();
  elem.html(message || 'Oops, sorry, something went wrong.');
  elem.removeClass('alert-info')
    .removeClass('alert-success')
    .removeClass('alert-danger')
    .removeClass('alert-warning')
  elem.addClass('alert-' + type || 'danger');
  elem.show();
  setTimeout(function () {
    elem.hide();
    elem.removeClass('alert-' + type || 'danger');
  }, dismissTime || 5000);
}