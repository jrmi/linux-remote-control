
$(function(){
	console.log("Activated");
	var $can = $("#canvas");
	
    var prevX, prevY;
	
	$can.hammer().on("dragstart", function(ev){
		ev.gesture.preventDefault();
		prevX = ev.gesture.center.pageX;
		prevY = ev.gesture.center.pageY;
	});
	
	$can.hammer().on("drag", function(ev){
		ev.gesture.preventDefault();
		
        var decX = ev.gesture.center.pageX - prevX;
        var decY = ev.gesture.center.pageY - prevY;
		prevX = ev.gesture.center.pageX;
		prevY = ev.gesture.center.pageY;
    	
    	$.get('http://' + host + ':' + port + '/lrc', {
    		cmd: "export DISPLAY=:0; xdotool mousemove_relative -- ", 
    	    xy: "" + decX + " " + decY + ""
    	});
	});
	
	$can.hammer().on("touch", function(ev){
		console.log("touch");		
	});
	$can.hammer().on("tap", function(ev){
		console.log("tap");		
		$.get('http://' + host + ':' + port + '/lrc', {
    		"cmd":"export DISPLAY=:0; xdotool click 1"
    	});
	});
	$can.hammer().on("doubletap", function(ev){
		console.log("doubletap");		
	});
});
