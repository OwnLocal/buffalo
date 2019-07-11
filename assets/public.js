$.ajax({
  url: "//typelaunch.ownlocal.com/assets/firebase.js",
  success: function(data) {
    $.ajax({
      url: "//typelaunch.ownlocal.com/assets/content.js"
    });
  }
});
