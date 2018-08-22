function doScroll(id) {
  $('html, body').animate(
    {
      scrollTop: ($('div.faq[x-id="' + id + '"] div.collapse').offset().top) - 110
    },
    200
  );
}

function openAccordianId(id) {
  $('.navbar-collapse').collapse('hide');
  var acc = $('div.faq[x-id="' + id + '"] div.collapse');
  acc.on('shown.bs.collapse', function () {
    doScroll(id)
  });
  acc.collapse('show');
  doScroll(id);
}

$('#navRegistry').click(function () {
  openAccordianId(22);
});

$('#navLodging').click(function () {
  openAccordianId(13);
});