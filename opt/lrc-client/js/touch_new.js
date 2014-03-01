
$(function(){
	console.log("Activated");
	var $can = $("#canvas");
	
    var prevX, prevY;
    var tapBefore = false;
    var holding = true;
	
	$can.hammer().on("dragstart", function(ev){
		ev.gesture.preventDefault();
		prevX = ev.gesture.center.pageX;
		prevY = ev.gesture.center.pageY;
	});
	
	$can.hammer().on("drag", function(ev){
		ev.gesture.preventDefault();
		
        var decX = (ev.gesture.center.pageX - prevX); //* ev.gesture.velocityX * 3;
        var decY = (ev.gesture.center.pageY - prevY); //* ev.gesture.velocityY * 3;
		prevX = ev.gesture.center.pageX;
		prevY = ev.gesture.center.pageY;
    	
    	$.get('http://' + host + ':' + port + '/lrc', {
    		cmd: "export DISPLAY=:0; xdotool mousemove_relative -- ", 
    	    xy: "" + decX + " " + decY + ""
    	});
	});
	
	$can.hammer().on("touch", function(ev){
		if(tapBefore){
			holding = true;		
			$.get('http://' + host + ':' + port + '/lrc', {
	    		"cmd":"export DISPLAY=:0; xdotool mousedown 1"
	    	});
		}		
	});
	
	$can.hammer().on("release", function(ev){
		if(holding){
			holding = false;		
			$.get('http://' + host + ':' + port + '/lrc', {
	    		"cmd":"export DISPLAY=:0; xdotool mouseup 1"
	    	});
		}		
	});
	
	$can.hammer().on("tap", function(ev){
		tapBefore = true;
		setTimeout(function(){
			tapBefore = false;	
			if(!holding){
				$.get('http://' + host + ':' + port + '/lrc', {
		    		"cmd":"export DISPLAY=:0; xdotool click 1"
		    	});
			}
		}, 200);
	});
	
});
