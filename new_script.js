var ad_selector = '#advertisement_bottom,#enhanced_skin_container,#skinSponsorImage,#promotional_ticker_container,#advertisement,.advertisement_double_wide,.advertisement_double_wide_short #google_adwords,#google_companion_ad_div_container,#leaderboard_container, #bottom_leaderboard_container';
$(ad_selector).remove();
chrome.extension.sendRequest({message_type:"debug", debug_message:"Removed Ads!"}, function(response){});
$("body").append("<div id='PandoraPlusData' style='display:none;'></div>");
var script = document.createElement('script');
script.appendChild(document.createTextNode("var notifyEvent; function fireNotifyEvent(data) { var hiddenDiv = document.getElementById('PandoraPlusData'); hiddenDiv.content(JSON.stringify(data)); hiddenDiv.dispatchEvent(notifyEvent);}(function PandoraPlusInject(){notifyEvent = document.createEvent('Event'); notifyEvent.initEvent('PandoraPlusTrackEvent', true, true); Pandora.setEventHandler(\"SongPlayed\", function(songData) { fireNotifyEvent({title:songData.songName, artist:songData.artistName, type:'touch'});})});"));
(document.body || document.head || document.documentElement).appendChild(script);

document.getElementById('PandoraPlusData').addEventListener('PandoraPlusTrackEvent', function() {
  chrome.extension.sendRequest({message_type:"song", song_data: $('#PandoraPlusData').html()}, function(response) {});
});


// chrome.extension.sendRequest({debug_message: "Pandora Plus Initialized!"}, function(response) {});
// 
// Pandora.setEventHandler("SongPlayed", function(songData) {
//   chrome.extension.sendRequest({debug_message: songData.songName + " - " + songData.artistName}, function(response) {});
// });
// 
// Pandora = {
//     fireEvent: function(eventName, songData) {
//         if (eventName == "SongPlayed") {
//             chrome.extension.sendRequest({debug_message: songData.songName + " - " + songData.artistName}, function(response) {});
//         }
//     }
// };
// 



// var trackEvent;
// function fireTrackEvent(data) { 
//   var hiddenDiv = document.getElementById('LikeFMComm');
//   hiddenDiv.textContent = JSON.stringify(data);
//   hiddenDiv.dispatchEvent(trackEvent);
// }
// (function LikeFMInject() {
//   // Comm link with content script
//   trackEvent = document.createEvent('Event');
//   trackEvent.initEvent('myTrackEvent', true, true);
//   Pandora.setEventHandler("SongPlayed", function(songData) {
//     fireTrackEvent({
//       title:songData.songName,
//       artist:songData.artistName,
//       type:'touch'
//     });
//   });
//   Pandora.setEventHandler("SongEnded", function(songData) {
//     fireTrackEvent({
//       title:songData.songName,
//       artist:songData.artistName,
//       type:'finish'});
//   });
// })();
