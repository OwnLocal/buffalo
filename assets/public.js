$.ajax({
  url: "//alpha.typelaunch.com/assets/firebase.js",
  success: function(data) {
    $.ajax({
      url: "//alpha.typelaunch.com/assets/content.js"
    });
  }
});
