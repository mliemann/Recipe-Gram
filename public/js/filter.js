/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */

var favorite = [];

$(".filterBtn").click(() => {
  favorite.length = 0;
  favorite;
  $('input[type="checkbox"]:checked').each(function () {
    favorite.push(this.value);
    console.log(favorite);
  });
});
