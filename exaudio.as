/**
 * ExAudio
 */
import flash.external.ExternalInterface;

var sounds:Array = new Array();


/* js api */
ExternalInterface.addCallback('createSound', this, function(src, sid) {
	if(typeof sid === 'number')
		sounds[sid] = new Sound();
	else
		sid = sounds.push(new Sound()) - 1;
		
	src || (sounds[sid].src = src);
	return sid; //sid refers to the sound pos in array
});

ExternalInterface.addCallback('load', this, function(sid, src) {
	sounds[sid].src = src;
	sounds[sid].loadSound(src, true);
	sounds[sid].stop();
});
ExternalInterface.addCallback('play', this, function(sid, src) {
	if(src) {
		sounds[sid].src = src;
		sounds[sid].loadSound(src, true);
	} else {
		sounds[sid].start(sounds[sid].position);
	}
});
ExternalInterface.addCallback('pause', this, function(sid) {
	sounds[sid].stop();
});

_root.onEnterFrame = function() { //update status per secound
	//@TODO update status
	//ExternalInterface.call('Audio.dispatch.updateStatus');
};


ExternalInterface.call('Audio.dispatch.flashLoaded');
stop();
