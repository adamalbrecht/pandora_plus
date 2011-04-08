var ad_selector = '#advertisement_bottom,#enhanced_skin_container,#skinSponsorImage,#promotional_ticker_container,#advertisement,.advertisement_double_wide,.advertisement_double_wide_short #google_adwords,#google_companion_ad_div_container,#leaderboard_container, #bottom_leaderboard_container';
$(ad_selector).remove();

$(document).ready(function(){
  $("#content.tuner").css("background-image", "url('" + chrome.extension.getURL('bg.png') + "')");
});

function inject_js_script(link, id) {
  var script = document.createElement('script');
  script.setAttribute("id", id);
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", link);
  document.getElementsByTagName('head')[0].appendChild(script);
}

$("body").append("<div id='PandoraPlusData' style='display:none;'></div>");
inject_js_script(chrome.extension.getURL('pandora_plus_injected.js'), "PandoraPlusScript");

document.getElementById('PandoraPlusData').addEventListener('PandoraPlusTrackEvent', function() {
  chrome.extension.sendRequest({message_type:"song", song_data: $('#PandoraPlusData').html()}, function(response) {});
});

