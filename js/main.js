// Values stored in local storage
var default_values = {
  "search_path": "search.json",
  "links_path": "data.json",
  "color1": "#ed333b",
  "color2": "#a51d2d",
  "angle": 180,
  "hero": "https://c4.wallpaperflare.com/wallpaper/760/803/807/anime-anime-girls-hakurei-reimu-touhou-wallpaper-preview.jpg",
  "hero_height": 200,
  "sticker": "https://img-02.stickers.cloud/packs/14dbf1b8-55cf-4a8c-904c-aa76f562e8fa/webp/625a9d81-d46f-41f8-b58c-5ca033a986bd.webp",
  "sticker_size": 200,
  "bottom": "img/fade.png"
}

// Search with different search engines
function findit(query_url){
  var word = $( "#searchtext" ).val();
  window.location = query_url+word;
}

// Set search engines
function set_search_engines(json) {
  var search_sites_content = "";
  var search_buttons = "";
  for (sitename in json){
    // Add link to home url
    var home_url = json[sitename]["home_url"];
    search_sites_content += "<a class='searchlogo' href='"+home_url+"'>"+sitename+"</a>";
    // Add search button
    var query_url = json[sitename]["query_url"];
    var button_text = json[sitename]["button_text"];
    search_buttons += "<a onclick='findit(`"+query_url+"`);' class='btn btn-dark searchbtn'>"+button_text+"</a>"
  }
  // Set sites and buttons
  $( "#search-websites" ).html(search_sites_content);
  $( "#search-buttons" ).html(search_buttons);
  // Set search form action
  var default_engine = Object.keys(json)[0];
  $( "#searchform" ).attr("onsubmit","findit('"+json[default_engine]["query_url"]+"');");
}

// Generate inner html for links block from json file
function generate_content(json) {
    var new_content = "";
    for (category in json) {
        new_content += "<div class='col-sm'><h1>"+category+"</h1>";
        for (sitename in json[category]) {
          var url = json[category][sitename];
          new_content += "<a href='"+url+"'>"+sitename+"</a>";
        }
        new_content += "</div>";
      }
    return new_content;
  }

// Save settings to local storage
function save_settings() {
  for (key in default_values) {
    var value = $( "#"+key ).val();
    localStorage.setItem(key,value);
  }
}

// Apply current settings and save them 
function apply_settings() {
  // Set search engines
  var search_path =  $( "#search_path" ).val();
  $.ajax({
    url:search_path + "?nocache=" + (new Date()).getTime(),
    type:'HEAD',
    // Show error
    error: function() { 
      alert("Error loading search engines: "+search_path+" not found!");
    },
    // Generate and load
    success: function() {
      $.getJSON(search_path + "?nocache=" + (new Date()).getTime(), function(json) {
        set_search_engines(json);
      });
    }
  });

  // Load content
  var links_path =  $( "#links_path" ).val();
  $.ajax({
    url:links_path + "?nocache=" + (new Date()).getTime(),
    type:'HEAD',
    // Show error
    error: function() { 
      $( "#links" ).html("Error loading "+links_path);
    },
    // Generate and load
    success: function() {
      $.getJSON(links_path + "?nocache=" + (new Date()).getTime(), function(json) {
        var new_content = generate_content(json);
        $( "#links" ).html(new_content);
      });
    }
  });

  // Change colors
  var color1 = $( "#color1" ).val();
  var color2 = $( "#color2" ).val();
  var angle = $( "#angle" ).val();
  $( ".background" ).css("background", "linear-gradient("+angle+"deg, "+color1+", "+color2+")")

  // Change search field focus color
  $("#searchtext").focus( function() {
    $("#searchtext").css("border-color", color1);
    var shadowcolor = color1.replace(")",", 0.25)").replace("rgb","rgba");
    $("#searchtext").css("box-shadow","0 0 0 0.2rem "+shadowcolor);
  });

  // Change hero image
  var hero = $( "#hero" ).val();
  var hero_height = $( "#hero_height" ).val();
  $(".heroimg").css("background-image", "url('"+hero+"')");
  $(".heroimg").css("height", hero_height);

  // Change sticker
  var sticker = $( "#sticker" ).val();
  var sticker_size = $( "#sticker_size" ).val();
  $(".sticker").css("background-image", "url('"+sticker+"')");
  $(".sticker").css("height", sticker_size);
  $(".sticker").css("width", sticker_size);

  // Change pattern
  var bottom = $( "#bottom" ).val();
  $(".bottom-pattern").css("background-image", "url('"+bottom+"')");

  // Save settings to local storage
  save_settings();
}

// On document load
$( document ).ready(function() {
  // Check values
  for (key in default_values) {
    // Set default settings if keys not found in local storage
    if (!localStorage.hasOwnProperty(key)) {
      localStorage.setItem(key,default_values[key]);
      $( "#"+key ).val(default_values[key]);
    // Load settings from local storage
    } else {
      $( "#"+key ).val(localStorage.getItem(key));
    }
  }
  // Apply all settings
  apply_settings();
});

$(window).on('load', function(){
  function show_popup(){
    $( "#searchtext" ).click();
  };
  window.setTimeout( show_popup, 1000 ); // 5 seconds
});

// Track settings changes
$( "#search_path" ).change(function() {apply_settings();});
$( "#links_path" ).change(function() {apply_settings();});
$( "#color1" ).change(function() {apply_settings();});
$( "#color2" ).change(function() {apply_settings();});
$( "#angle" ).change(function() {apply_settings();});
$( "#hero" ).change(function() {apply_settings();});
$( "#hero_height" ).change(function() {apply_settings();});
$( "#sticker" ).change(function() {apply_settings();});
$( "#sticker_size" ).change(function() {apply_settings();});
$( "#bottom" ).change(function() {apply_settings();});

// Prevent default behavior on search form
$( "#searchform" ).submit(function( event ) {
  event.preventDefault();
});
