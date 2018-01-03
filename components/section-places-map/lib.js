$(document).ready(function () {
  // $('.owl-carousel').owlCarousel();
});

function initMap() {
  $.ajax({
    url: '/api/place',
    type: 'get',
    complete: function (xhr) {
      var locations = xhr.responseJSON.places;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(33.850282, -84.389020),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var infowindow = new google.maps.InfoWindow({});
      var marker, i;
      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i].lat, locations[i].long),
          map: map,
          title: locations[i].name,
          animation: google.maps.Animation.DROP
        });
        locations[i].marker = marker;
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            // infowindow.setContent(locations[i].info + '<br><br><button type="button" class="btn btn-outline-info btn-sm">Send to my Mobile</button>');
            infowindow.setContent(locations[i].info);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
      $.each(locations, function (index, location) {
        let htmlSendToMobile = '<button type="button" class="btn btn-outline-info btn-sm buttonSendToMobile">Send to <i class="fa fa-mobile" aria-hidden="true"></i></button>'
        $('#placeListing').append('<div class="divPlace"><div class="place" x-info="' + location.info + '">' + location.name + '</div>' + ($('#userFirstName').val() ? htmlSendToMobile : '') + '</div>');
        $('#placeListing div.divPlace:last-child').click(function () {
          infowindow.setContent(location.info);
          infowindow.open(map, location.marker);
          $('html, body').animate({
            scrollTop: $('#colFull').offset().top
          }, 200);
        });
        $('#placeListing div.divPlace:last-child button').click(function () {
          infowindow.setContent(location.info);
          infowindow.open(map, location.marker);
          sendPlaceInfo($(this), location.name + '\r' + location.address1 + '\r' + location.address2 + '\r\r' + location.note);
        });
      });
      var owl = $('.owl-carousel')
      owl.owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        items: 4,
        autoWidth: true,
        dots: true
      });
      owl.on('changed.owl.carousel', function (p) {
        console.log(p);
      });
    }
  });
}