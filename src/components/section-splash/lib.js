function daysUntil() {
  var then = new Date(2018, 5, 9, 14, 0);
  var now = new Date();
  return Math.round((then - now) / 1000 / 60 / 60 / 24);
}

function updateDtg() {
  $('#dtg').html(daysUntil());
}

updateDtg();
setInterval(function () {
  updateDtg();
}, 60000);