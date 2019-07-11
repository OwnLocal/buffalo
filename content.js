appName = "Project Buffalo";

// Load Template

$("body").prepend("\
  <header>\
    <div class='header'>\
      <div class='container'>\
        <a class='logo' href='.'><img><span class='name ts editable site_name'></span>\
          <span class='clear'></span>\
        </a>\
        <div class='nav ts'>\
          <div class='nav-inner modal-launcher nav-settings-launcher'>\
          </div>\
        </div>\
        <span class='nav-open  mdi mdi-menu  nav-toggle'></span>\
        <span class='nav-close mdi mdi-close nav-toggle'></span>\
      </div>\
    </div>\
  </header>\
  <hero>\
    <section class='hero section'>\
      <div class='hero-graphic'></div>\
      <div class='container middle-tc'>\
        <h1 class='ts'><span class='editable hero_headline'></span></h1>\
        <p class='ts'><span class='editable hero_subheadline'></span></p>\
        <div class='hero-actions modal-launcher hero-actions-settings-launcher'>\
          <div class='hero-actions-button'>\
            <a class='hero-cta' data-url='' href=''></a>\
          </div>\
          <div class='hero-actions-form'>\
            <form>\
              <input type='email' value='' placeholder='Enter email address' autocomplete='off' required>\
              <input type='submit'>\
            </form>\
          </div>\
        </div>\
      </div>\
      <div class='hero-background'></div>\
      <div class='hero-video'></div>\
    </section>\
  </hero>\
  <sections></sections>\
");

$("body").attr("data-site-id",siteID);

// Mobile Header Toggle

$(".nav-toggle").on("click", function() {
  $("body").toggleClass("nav-active");
  $("html,body").toggleClass("frozen");
});

firebase.database().ref("sites/" + siteID).once("value", function(snapshot) {

  // Site Title

  if (snapshot.hasChild("site_title")) {
    site_title = snapshot.val().site_title;
  } else {
    site_title = appName;
  }

  // Primary Color

  if (snapshot.hasChild("primary_color")) {
    primary_color = snapshot.val().primary_color;
  } else {
    primary_color = "#6C63FF";
  }

  // Site Name

  if (snapshot.hasChild("site_name")) {
    $(".site_name").text(snapshot.val().site_name);
  } else {
    $(".site_name").text("Site Name");
  }

  // Theme

  if (snapshot.hasChild("theme")) {
    theme = snapshot.val().theme;
  } else {
    theme = "a";
  }
  $("body").attr("data-theme", theme);

  // Inner Page (Hardcoded)

  if (snapshot.hasChild("inner_page")) {
    inner_page = snapshot.val().inner_page;
    if (inner_page == "true") {   
      $("body").addClass("inner-page");
      $(".logo").attr("href","/");
    }
  }

  // Font

  if (snapshot.hasChild("main_font")) {
    main_font = snapshot.val().main_font;
  } else {
    main_font = "neutral";
  }
  $("body").attr("data-main-font", main_font);

  // Color Scheme

  if (snapshot.hasChild("color_scheme")) {
    color_scheme = snapshot.val().color_scheme;
  } else {
    color_scheme = "1";
  }
  $("body").attr("data-color-scheme", color_scheme);

  // Logo

  if (snapshot.hasChild("logo")) {
    logo = snapshot.val().logo;
    $(".logo img").attr("src", logo);
    $(".logo img").show();
    $(".header .logo .name").hide();
  } else {
    $(".logo img").attr("src",".");
  }

  // White Header

  if (snapshot.hasChild("white_header")) {
    white_header = snapshot.val().white_header;
    if (white_header == "true") {   
      $("body").addClass("white-header");
    }
  }

  // Navigation

  if (snapshot.hasChild("navigation")) {
    navigation = JSON.parse(snapshot.val().navigation);
  } else {
    navigation = [
      {
        label: "About",
        url: "",
        target: "false"
      },
      {
        label: "Services",
        url: "",
        external: "false"
      },
      {
        label: "Contact",
        url: "mailto:your@email.com",
        external: "true"
      }
    ]
  }
  $.each(navigation, function(index) {
    if (navigation[index].url == "" && navigation[index].label == "Contact" && navigation[index].external == "false") {
      specialClass = "go-to-contact";
    } else if  (navigation[index].url == "" && navigation[index].external == "false") {
      specialClass = "go-to-first-section"
    } else {
      specialClass = "";
    }
    $(".nav-inner").append("<a class='" + specialClass + "' href='" + navigation[index].url + "'" + ((navigation[index].external == "true") ? "target='_blank'" : "") + ">" + navigation[index].label + "</a>");
  });
  
  // Hero CTA

  if (snapshot.hasChild("hero_cta_option")) {
    hero_cta_option = snapshot.val().hero_cta_option;
  } else {
    hero_cta_option = "button";
  }
  if (hero_cta_option == "form") {
    $("body").attr("data-hero-cta-option","form");  
  } else if (hero_cta_option == "nothing") {
    $("body").attr("data-hero-cta-option","nothing");  
  } else {
    $("body").attr("data-hero-cta-option","button");  
  }

  if (snapshot.hasChild("hero_cta_button_label")) {
    hero_cta_button_label = snapshot.val().hero_cta_button_label;
  } else {
    hero_cta_button_label = "";
  }
  $(".hero-cta").text(hero_cta_button_label);

  if (snapshot.hasChild("hero_cta_button_url")) {
    hero_cta_button_url = snapshot.val().hero_cta_button_url;
  } else {
    hero_cta_button_url = "";
  }
  setTimeout(function(){
    $(".hero-cta").attr("href", hero_cta_button_url);
  } , 1000);

  if (hero_cta_button_url == "" || hero_cta_button_url == "undefined" || hero_cta_button_url == "scroll" || hero_cta_button_url == "Scroll" || hero_cta_button_url == "down" || hero_cta_button_url == "Down") {
    $(".hero-cta").addClass("go-to-first-section");
  } else {
    $(".hero-cta").attr("href", hero_cta_button_url);  
  }

  if (snapshot.hasChild("hero_cta_button_external")) {
    hero_cta_button_external = snapshot.val().hero_cta_button_external;
  } else {
    hero_cta_button_external = "false";
  }
  if (hero_cta_button_external == "true") {
    $(".hero-cta").attr("target","_blank");
  }

  if (snapshot.hasChild("hero_cta_button_type")) {
    hero_cta_button_type = snapshot.val().hero_cta_button_type;
  } else {
    hero_cta_button_type = "";
  }

  if (snapshot.hasChild("hero_cta_form_label")) {
    hero_cta_form_label = snapshot.val().hero_cta_form_label;
    $(".hero-actions-form input[type=submit]").attr("value",hero_cta_form_label);
  } else {
    hero_cta_form_label = "";
    $(".hero-actions-form input[type=submit]").attr("value","Subscribe");
  }

  if (snapshot.hasChild("hero_cta_form_mc_code")) {
    hero_cta_form_mc_code = snapshot.val().hero_cta_form_mc_code;
    $(".hero-actions-form form").attr("action",hero_cta_form_mc_code).attr("method","post").attr("id","mc-embedded-subscribe-form").attr("name","mc-embedded-subscribe-form").attr("class","validate").attr("target","_blank");
    $(".hero-actions-form input[type=email]").attr("name","EMAIL").attr("class","email").attr("id","mce-EMAIL");
    $(".hero-actions-form input[type=submit]").attr("name","subscribe").attr("id","mc-embedded-subscribe").attr("class","button");
  } else {
    hero_cta_form_mc_code = "";
  }

  // Hero Background Video Source

  if (snapshot.hasChild("hero_background_video_source")) {
    hero_background_video_source = snapshot.val().hero_background_video_source;
  } else {
    hero_background_video_source = "https://ownlocal.com/assets/video.mp4";
  }

  if (snapshot.hasChild("hero_background_video_poster")) {
    hero_background_video_poster = snapshot.val().hero_background_video_poster;
  } else {
    hero_background_video_poster = "https://ownlocal.com/assets/video-poster.jpg";
  }

  // Hero Background Video
  
  if (snapshot.hasChild("hero_background_video")) {
    hero_background_video = snapshot.val().hero_background_video;
    if (hero_background_video == "true") {
      $(".hero-background").remove();
      $(".hero-video").html("<video muted loop playsinline autoplay></video>").attr("style","display: block; background-image: url('" + hero_background_video_poster + "')");
      $(".hero-video video").attr("src", hero_background_video_source);
      $(".hero-video video").attr("poster", hero_background_video_poster);
      setTimeout(function(){
        $("video")[0].play();
      } , 1000);
    }
  }

  // Hero Background

  if (snapshot.hasChild("hero_background")) {
    hero_background = snapshot.val().hero_background;
    $(".hero-background").attr("style","background-image: url(" + (hero_background) + ")");
  }

  // Hero Graphic
  
  if (snapshot.hasChild("hero_graphic")) {
    hero_graphic = snapshot.val().hero_graphic;
    if (hero_graphic.length > 2) {
      $(".hero-graphic").attr("style","background-image: url('" + hero_graphic + "')");
    } else {
      $("body").addClass("no-hero-graphic");
    }
  } else {
    $(".hero-graphic").attr("style","background-image: url('https://ucarecdn.com/6cc60f06-07ec-4394-83e0-41b2ded0925e/')"); 
  }

  // Hero Headline

  if (snapshot.hasChild("hero_headline")) {
    hero_headline = snapshot.val().hero_headline;
  } else {
    hero_headline = "Replace This Text To Personalize Your Page";
  }
  $(".hero_headline").html(hero_headline);

  // Hero Subheadline

  if (snapshot.hasChild("hero_subheadline")) {
    hero_subheadline = snapshot.val().hero_subheadline;
  } else {
    hero_subheadline = "We recommend using this space to talk a bit more about your product or service. We suggest not writing more than 3-4 lines, since it will look too long on mobile views.";
  }
  $(".hero_subheadline").html(hero_subheadline);

  // Page Sections
  
  if (snapshot.hasChild("page_sections")) {
    page_sections = snapshot.val().page_sections;
  } else {
    page_sections = "";
  }
  $("sections").html(page_sections);

  // Address Line 1
  
  if (snapshot.hasChild("address_line_one")) {
    address_line_one = snapshot.val().address_line_one;
  } else {
    address_line_one = "205 W 9th St";
  }
  $(".address_line_one").text(address_line_one);
  
  // Address Line 2
  
  if (snapshot.hasChild("address_line_two")) {
    address_line_two = snapshot.val().address_line_two;
  } else {
    address_line_two = "Austin, TX 78701";
  }
  $(".address_line_two").text(address_line_two);
  $(".directions-block").attr("href","https://maps.google.com/?daddr=" + address_line_one + " " + address_line_two);
  $(".contact.section .map iframe").attr("src","https://maps.google.com/maps?q=" + address_line_one + " " + address_line_two + "&z=13&output=embed");
  
  // Phone Number
  
  if (snapshot.hasChild("phone_number")) {
    phone_number = snapshot.val().phone_number;
  } else {
    phone_number = "(512) 501-6265";
  }
  $(".phone-block").attr("href","tel:+1" + phone_number.replace(/[^0-9\.]/g, ''));
  $(".phone_number").text(phone_number);
  
  $("body").attr("data-loaded","true");
  
  if ($(".section").length == 1) {
    $("body").addClass("no-sections");
  } else if ($(".section").length == 2 && $(".section.footer").length == 1) {
    $("body").addClass("footer-only");
  }

  $("a").each(function() {
    $(this).attr("href",$(this).attr("data-url"));
    $(this).removeAttr("data-url");
  });
  
  // Elevator Scrolls

  $(".go-to-contact").on("click", function() {
    event.preventDefault();
    $("body").removeClass("nav-active");
    $("html,body").removeClass("frozen");
    $("html,body").animate({
      scrollTop: $("sections .contact:first").offset().top
    });
  });

  $(".go-to-first-section").on("click", function() {
    event.preventDefault();
    $("body").removeClass("nav-active");
    $("html,body").removeClass("frozen");
    $("html,body").animate({
      scrollTop: $("sections .section:first").offset().top
    });
  });

  $(".elevator-scroll").on("click", function() {
    event.preventDefault();
    elevatorTarget = $(this).attr("data-elevator-target");
    $("html,body").animate({
      scrollTop: $(elevatorTarget).offset().top
    });
  });
  
});