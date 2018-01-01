$(document).ready(function () {
  $('#buttonRsvpPersonAdd').click(function () {
    var personFirstName = $('#personFirstName')[0].value;
    var personLastName = $('#personLastName')[0].value;
    var personMealType = parseInt($('#personMealType').val());
    var personConsiderations = $('#personConsiderations').val();
    var eventFriday = $('#eventF').prop('checked') ? 1 : 0;
    var eventSaturday = $('#eventS').prop('checked') ? 1 : 0;
    var eventSunday = $('#eventU').prop('checked') ? 1 : 0;
    if (personFirstName.length === 0) {
      $('#personFirstName').focus();
      return $('#personFirstName').addClass('is-invalid');
    } else {
      $('#personFirstName').removeClass('is-invalid');
    }
    if (personMealType === 0) {
      $('#personMealType').focus();
      return $('#personMealType').addClass('is-invalid');
    } else {
      $('#personMealType').removeClass('is-invalid');
    }
    var payload = {
      firstName: personFirstName,
      lastName: personLastName,
      mealType: personMealType,
      considerations: personConsiderations,
      eventFriday,
      eventSaturday,
      eventSunday
    };
    $.ajax({
      type: 'post',
      url: '/api/rsvpPerson',
      dataType: 'json',
      data: JSON.stringify(payload),
      contentType: 'application/json',
      complete: function (xhr) {
        var status = xhr.status;
        switch (status) {
          case 200:
            refreshRsvpPersons(function () {
              var ttRsvpPerson = $('#ttRsvpPerson').tooltip({
                trigger: 'manual'
              });
              ttRsvpPerson.tooltip('show');
              setTimeout(function () {
                ttRsvpPerson.tooltip('hide');
                $('#ttRsvpPerson').attr('title', '');
              }, 3000);
            });
            $('#personFirstName').val('');
            $('#personLastName').val('');
            $('#personMealType').val(0);
            $('#personConsiderations').val('');
            $('#eventF').prop('checked', false);
            $('#eventS').prop('checked', false);
            $('#eventU').prop('checked', false);
            $('#buttonRsvpPersonAdd').html('Add This Person');
            break;
          default:
            showAlert($('#alertRsvp'), 'danger', 'Sorry, something bad happened, try again?', 5000);
            break;
        }
      }
    });
  });
  $('input[name=chkbxAttend]').change(function () {
    var attend = parseInt($(this)[0].value);
    switch (attend) {
      case 1:
        $('#divRsvpNextStepsYes').css('display', 'block');
        $('#divRsvpNextStepsNo').css('display', 'none');
        break;
      case 0:
        $('#divRsvpNextStepsYes').css('display', 'none');
        $('#divRsvpNextStepsNo').css('display', 'block');
        break;
    }
    $.ajax({
      type: 'post',
      url: '/api/rsvp',
      dataType: 'json',
      data: JSON.stringify({attend}),
      contentType: 'application/json',
      complete: function (xhr) {
        var status = xhr.status;
        switch (status) {
          case 200:
            refreshRsvpPersons();
            break;
          default:
            console.error(xhr.responseJSON.message);
            showAlert($('#alertRsvp'), 'danger', 'Sorry, something bad happened, try again?', 5000);
            break;
        }
      }
    });
  });
  // $('#userMealType').change(function () {
  //   persistUserRsvpPerson();
  // });
  $('#personFirstName').keyup(function (e) {
    var val = $(this).val();
    if (val.length > 3) {
      $('#buttonRsvpPersonAdd').html('Add ' + val);
    } else {
      $('#buttonRsvpPersonAdd').html('Add This Person');
    }
  });
});

function refreshRsvpPersons(cb) {
  $.ajax({
    type: 'get',
    url: '/api/rsvp/by/user/self',
    complete: function (xhr) {
      var status = xhr.status;
      switch (status) {
        case 200:
          var rsvpPersons = xhr.responseJSON.rsvpPersons;
          $('#divRsvpPersons tbody').html('');
          if (rsvpPersons.length > 0) {
            $.each(rsvpPersons, function (i, v) {
              $('#divRsvpPersons tbody').append(`
                <tr>
                    <td>
                        <i class="fa fa-trash rsvpPersonDelete ${v.user_id ? 'displayNone' : ''}" aria-hidden="true" x-id="${v.id}"></i>
                    </td>
                    <td>${v.first_name || ''} ${v.last_name || ''}</td>
                    <td>${v.description || ''}</td>
                    <td>${v.event_friday === 1 ? '<i class="fa">&#xf0fc;</i>' : ''}${v.event_saturday === 1 ? '<i class="fa">&#xf004;</i>' : ''}${v.event_sunday === 1 ? '<i class="fa">&#xf072;</i>' : ''}</td>
                    <td data-toggle="tooltip" data-placement="top" title="${v.considerations}">${v.considerations ? v.considerations.substr(0, 8) + '...' : ''}</td>
                </tr>
            `);
            });
          } else {
            $('#divRsvpPersons tbody').append(`
                <tr>
                    <td colspan="5">
                        <i>
                            add people, like yourself, to your RSVP <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
                        </i>
                    </td>
                </tr>
            `);
            $('#buttonRsvpPersonAdd').html('Add ' + $('#userFirstName').val() + ' (you)');
            $('#personFirstName').val($('#userFirstName').val());
            $('#personLastName').val($('#userLastName').val());
          }
          $('.rsvpPersonDelete').click(function (e) {
            $(this).css('display', 'none');
            var rsvpPersonId = e.target.attributes['x-id'].value;
            $.ajax({
              type: 'delete',
              url: '/api/rsvpPerson/' + rsvpPersonId,
              complete: function (xhr) {
                var status = xhr.status;
                switch (status) {
                  case 200:
                    refreshRsvpPersons();
                    break;
                  default:
                    showAlert($('#alertRsvp'), 'danger', 'Sorry, something bad happened, try again?', 5000);
                    break;
                }
              }
            });
          });
          $(function () {
            $('[data-toggle="tooltip"]').tooltip();
          });
          if (cb) {
            cb();
          }
          break;
        default:
          showAlert($('#alertRsvp'), 'danger', 'Sorry, something bad happened, try again?', 5000);
          break;
      }
    }
  });
}

refreshRsvpPersons();

// function Scanner(opts, cb) {
//   this._interval = undefined
//   this._lastKeyup = undefined
//   this._elementSelector = opts.elementSelector || 'input'
//   this._threshold = opts.threshold || 500
//   this._cb = cb
//
//   $(this._elementSelector).keyup(function () {
//     this._lastKeyup = new Date();
//     if (!this._interval) {
//       this._interval = setInterval(this._monitor.bind(this), 100);
//     }
//   }.bind(this));
// }
//
// Scanner.prototype._monitor = function () {
//   if ((new Date() - this._lastKeyup) > this._threshold) {
//     this._cb($(this._elementSelector));
//     clearInterval(this._interval);
//     this._interval = undefined;
//   }
// }
//
// var s = new Scanner(
//   {
//     elementSelector: '#userConsiderations'
//   },
//   function () {
//     persistUserRsvpPerson();
//   }
// );

function persistUserRsvpPerson() {
  var userMealType = parseInt($('#userMealType').val());
  var userConsiderations = $('#userConsiderations').val();
  if (userMealType === 0) {
    return $('#userMealType').addClass('is-invalid');
  } else {
    $('#userMealType').removeClass('is-invalid');
  }
  const payload = {
    mealType: userMealType,
    considerations: userConsiderations
  }
  $.ajax({
    type: 'patch',
    url: '/api/rsvpPerson',
    dataType: 'json',
    data: JSON.stringify(payload),
    contentType: 'application/json',
    complete: function (xhr) {
      var status = xhr.status;
      switch (status) {
        case 200:
          $('#cardPersonRsvpPerson').removeClass('displayNone');
          refreshRsvpPersons();
          flashSave('#userRsvpPersonSave');
          break;
        default:
          showAlert($('#alertRsvp'), 'danger', 'Sorry, something bad happened, try again?', 5000);
          break;
      }
    }
  });
}

function flashSave(elem) {
  $(elem).animate(
    {
      opacity: 0.8
    },
    function () {
      $(elem).animate({opacity: 0}, 4000);
    }
  );
}

// $(function () {
//   $('[data-toggle="tooltip"]').tooltip();
// });


