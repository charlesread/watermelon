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

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// function initMap () {
//   $.ajax({
//     url: '/api/place',
//     type: 'get',
//     complete: function (xhr) {
//       var locations = xhr.responseJSON.places;
//       var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 10,
//         center: new google.maps.LatLng(33.750282, -84.389020),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       });
//       var infowindow = new google.maps.InfoWindow({});
//       var marker, i;
//       for (i = 0; i < locations.length; i++) {
//         marker = new google.maps.Marker({
//           position: new google.maps.LatLng(locations[i].lat, locations[i].long),
//           map: map,
//           title: locations[i].name,
//           animation: google.maps.Animation.DROP
//         });
//         locations[i].marker = marker;
//         google.maps.event.addListener(marker, 'click', (function (marker, i) {
//           return function () {
//             // infowindow.setContent(locations[i].info + '<br><br><button type="button" class="btn btn-outline-info btn-sm">Send to my Mobile</button>');
//             infowindow.setContent(locations[i].info);
//             infowindow.open(map, marker);
//           }
//         })(marker, i));
//       }
//       $.each(locations, function (index, location) {
//         $('#placeListing').append('<div class="divPlace"><div class="place" x-info="' + location.info + '">' + location.name + '</div><button type="button" class="btn btn-outline-info btn-sm buttonSendToMobile">Send to my Mobile</button></div>');
//         $('#placeListing div.divPlace:last-child .place').click(function () {
//           infowindow.setContent(location.info);
//           infowindow.open(map, location.marker);
//         });
//         $('#placeListing div.divPlace:last-child button').click(function () {
//           infowindow.setContent(location.info);
//           infowindow.open(map, location.marker);
//           sendPlaceInfo($(this), location.name + '\r' + location.address1 + '\r' + location.address2 + '\r\r' + location.note);
//         });
//       });
//     }
//   });
// }