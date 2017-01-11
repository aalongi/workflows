$(function() {
  var Mustache = require('mustache');
  //already required jquery in coffeescript file, so don't need to do it again.
 
  $.getJSON('js/data.json', function(data) {
    var template = $('#speakerstpl').html();
    var html = Mustache.to_html(template, data);
    $('#speakers').html(html);    
  }); //getJSON
  
}); //function