var notifyEvent;
function fireNotifyEvent(data) {
  var hiddenDiv = document.getElementById('PandoraPlusData');
  hiddenDiv.textContent = JSON.stringify(data);
  hiddenDiv.dispatchEvent(notifyEvent);
}
$(document).ready(function(){
  notifyEvent = document.createEvent('Event');
  notifyEvent.initEvent('PandoraPlusTrackEvent', true, true);
  Pandora.setEventHandler('SongPlayed', function(songData) {
    fireNotifyEvent({songName:songData.songName, artistName:songData.artistName, type:'touch'});
  })
});
