var $ = jQuery;

function validPhone() {
  var elem = $('#phone')[0];
  var num = elem.value;
  return !(num.match(/\D/g) || num.length !== 10);
}

$(document).ready(function () {
  $('#buttonPhoneAddSave').click(function () {
    if (!validPhone()) {
      var elem = $('#alertPhoneAdd')
      showAlert(elem, 'warning', 'Hey, sorry, we need that phone number to be 10 digits long...');
      $('#phone').addClass('is-invalid');
      return
    }
    $.ajax({
      url: '/api/phone',
      type: 'post',
      dataType: "json",
      data: JSON.stringify({phone: $('#phone')[0].value}),
      contentType: "application/json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          showAlert($('#alertPhoneAdd'), 'success', 'Got it!  You\'re all set!', 2000);
          setTimeout(function () {
            $('#modalPhoneAdd').modal('hide');
          }, 2000);
        } else {
          showAlert($('#alertPhoneAdd'));
        }
      }
    });
  });
  $('#phone').keyup(function() {
    $(this)[0].value = $(this)[0].value.replace(/\D/g, '').substring(0, 10);
    if (validPhone()) {
      $('#phone').addClass('is-valid').removeClass('is-invalid');
    } else {
      $('#phone').removeClass('is-valid').addClass('is-invalid');
    }
  });
});