import flash.external.*;

/**
 * ExAudio
 */
var sounds:Array = new Array();





/* javascript interfaces */
ExternalInterface.addCallback('create', null, function(url) {
	var id = sounds.push(new Sound()) - 1;
	return id; //id refers to the pos in array
});
ExternalInterface.addCallback('pause', null, function(id, pos) {
	return 'xx';
});
ExternalInterface.addCallback('play', null, function(id, arg) {
	if(typeof arg === 'string') { //load new music and play
	
	} else if(typeof arg === 'number') { //jump and play
	
	} else { //play
	
	}
	return 'xx';
});
_root.onEnterFrame = function() { //update status per secound
	//update status
};

stop();
