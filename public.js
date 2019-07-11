/*
  ======================
  HTML CODE FOR WEBSITES
  ======================
*/

/*
  <!DOCTYPE html>
  <html>
    <head>
      <title>[[ Site Title ]]</title>
      <meta content="" name="description">
      <meta content="initial-scale=1, maximum-scale=1, width=device-width, user-scalable=no" name="viewport">
      <link rel="icon" href="//buffalo.ownlocal.com/brand/favicon.png">
      <link rel="apple-touch-icon-precomposed" href="//buffalo.ownlocal.com/brand/icon.png">
      <link rel="stylesheet" href="//buffalo.ownlocal.com/assets/styles.css">
    </head>
    <body data-loaded="false">
      <script>
        siteID = "e1JHeAzR48fsfvtkkoNJQ6snVM52";
      </script>
      <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="//www.gstatic.com/firebasejs/5.8.6/firebase.js"></script>
      <script src="//buffalo.ownlocal.com/assets/public.js"></script>
    </body>
  </html>
*/

$.ajax({
  url: "//buffalo.ownlocal.com/assets/firebase.js",
  success: function(data) {
    $.ajax({
      url: "//buffalo.ownlocal.com/assets/content.js"
    });
  }
});