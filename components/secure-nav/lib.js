$('#navRegistry').click(function () {
  $('.navbar-collapse').collapse('hide');
  $('#faqItem22').collapse('show');
  $('html, body').animate(
    {
      scrollTop: ($('#divRegistry').offset().top) - 110
    },
    200);
});