var favorite = [];

$(document).ready(() => {
  $(".filterBtn").click(() => {
    favorite.length = 0;
    favorite;
    $('input[type="checkbox"]:checked').each(function () {
      favorite.push(this.value);
      console.log(favorite);
    });
  
    document.location.replace(`/filtered/${favorite.join(",")}`);
  
  });
  
});