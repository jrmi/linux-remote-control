var express = require("express"),
        app = express(),
        sys = require("sys"),
        exec = require("child_process").exec,
        child;

app.all("/lrc", function(req, res) {
    var command = "";
        
    if (typeof req.query.xy === "undefined" && typeof req.query.hw === "undefined") {
        command = req.query.cmd;
    } else {

        //Get position of cursor
        var xy = req.query.xy.split(" ");
        
        var x = xy[0];
        var y = xy[1];

        command = req.query.cmd + x + " " + y;
    }
    //console.log(command);
    
    exec(command, function(err, stdout, stderr) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.send({res: stdout});
    });
});


/**
 * handles all requests
 */
app.get(/^\/(.*)/, function(req, res) {
    child = exec("rhythmbox-client --print-playing-format='%ta;%at;%tt;%te;%td;' && amixer sget Master && xbacklight -get", function(error, stdout, stderr) {
        res.header("Content-Type", "text/javascript");
        // error of some sort
        if (error !== null) {
            res.send("0");
        }
        else {
            // info actually requires us returning something useful
            if (req.params[0] == "info") {
                info = stdout.split(";");
                var volume = info[5].split("%]");
                volume = volume[0].split("[");
                volume = volume[1];

                var backlight = info[5].split("[on]");
                backlight = backlight[1].replace(/^\s+|\s+$/g, "");
                backlight = backlight.split(".");
                backlight = backlight[0];
                //console.log(backlight);
                res.send(req.query.callback + "({'artist':'" + escape(info[0]) + "', 'album':'" + escape(info[1]) + "', 'title': '" + escape(info[2]) + "', 'elapsed': '" + info[3] + "', 'duration':'" + info[4] + "', 'volume':'" + volume + "', 'backlight':'" + backlight + "'})");
            }
            else {
                res.send(req.query.callback + "()");
            }
        }
    });

});

app.listen(3000);
