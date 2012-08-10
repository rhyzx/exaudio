/**
 * ExAudio
 */
;(function() {
	"use strict";
	
	var tmp = document.createElement('audio');
	//if(tmp.canPlayType && tmp.canPlayType('audio/mp3')) return;
	
	window.Audio = Audio; //bind
	
	/* append flash */
	//embed callback doesn't work in ie 
	//tmp.innerHTML = '<embed src="exaudio.swf" wmode="transparent" width="1" height="1" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	tmp.innerHTML = 
		'<object width="1" height="1" type="application/x-shockwave-flash" data="exaudio.swf" \
			codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0">\
			<param name="movie" value="exaudio.swf" />\
			<param name="quality" value="high" />\
			<param name="wmode" value="transparent" />\
		</object>';
	var flash = tmp.firstChild; document.documentElement.appendChild(flash);
	
	//temp exaudio system before flash loaded
	var exaudio = {
		 sounds			: []
		,createSound	: function(src) {
			return exaudio.sounds.push({src : src}) - 1;
		}
		,load			: function(sid, src) {
			exaudio.sounds[sid].load = true;
			exaudio.sounds[sid].src = src;
		}
		,play			: function(sid, src) {
			exaudio.sounds[sid].play = true;
			exaudio.sounds[sid].src = src;
		}
		,pause			: function(sid) {
			exaudio.sounds[sid].play = false;
		}
	};
	
	//main class
	function Audio(src) {
		this.sid = exaudio.createSound(src);
		this.src = src;
	}
	Audio.prototype = {
		constructor	: Audio
		,sid		: 0	//sound id
		,src		: ''
		,volume		: 1
		
		,load		: function() {
			exaudio.load(this.sid, this.src);
		}
		,play		: function() {
			exaudio.play(this.sid, this.src);
		}
		,pause		: function() {
			exaudio.pause(this.sid);
		}
		//,stop 
		
		
		,addEventListener : function(evt, callback) {
			exaudio.pause(this.sid);
		}
		
		,_types		: {
			 'audio/mp3'	: 'maybe'
			,'audio/wav'	: 'maybe'
		}
		,canPlayType: function(type) {
			return this._types[type] || '';
		}
	};
	
	//as callback api
	Audio.dispatch = {
		 flashLoaded	: function() {
			for(var i=0, s; s=exaudio.sounds[i]; i++) {
				flash.createSound(s.src, i);
				s.load && flash.load(i);
				s.play && flash.play(i);
			}
			exaudio = flash;
		}
		//@TODO update audio status
		,updateStatus	: function() {
		
		}
	};
})();