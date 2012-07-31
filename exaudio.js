var player = new PurePlayer('music.mp3', {
				onLoad: function() {
				
				},
				
				onPlaying: function() {
				
				},
				
				onLoadComplete: function() {
				
				}
			});

/*********************************************/
;(function() {
	var EVENTS = ['onLoad', 'onPlaying', 'onLoadComplete'];
	var sys;
	
	/* Main Class */
	function PurePlayer(url, config) {
		sys || initSystem();
		this.id = sys.createAudio(url);
		
		for(var i in config) {
			this[i] && (this[i] = config[i]);
		}
	}
	for(var i=EVNETS.length, evt, defaultFn=function(){}; i--; evt=EVNETS[i]) {
		PurePlayer.prototype[evt]  = defaultFn;//add default function
	}
	PurePlayer.prototype.play	= function() {
	
	};
	PurePlayer.prototype.pause	= function() {
	
	};
	PurePlayer.prototype.stop	= function() {
	
	};
	

	function initSystem() { //init on demand
		var e = document.createElement('audio');
		if(e.canPlayType && e.canPlayType('audio/mp3')) { //by HTML5 Audio
			//@TODO HTML5 Audio implement
		} else { //by FLASH Sound
			e.innerHTML = '<object data="pureplayer.swf" type="application/x-shockwave-flash"> \
					<param name="movie" value="pureplayer.swf"/> \
					</object>';
			obj = e.firstChild;
			document.body.appendChild(obj);
			
			sys = obj;
		}

	}
})();