var net = require('net');
var exec = require('child_process').exec;
var screenshot = require('desktop-screenshot');
var fs = require('fs');
var jimp = require('jimp');

var server = net.createServer(function(socket) {
    socket.bufferSize = 30 * 1024;

    socket.on('data', function(cmds) {
        console.log('Socket Buffer size: ' + socket.bufferSize);
        if (cmds == 'getscreenshot') {
            screenshot('shot.jpg', { width: 600 }, function(err, ok) {
                if (err) throw err;
                if (ok) {
                    jimp.read('shot.jpg')
                        .then(function(file) {
                            file
                                .dither565()
                                .normalize()
                                .getBuffer(jimp.MIME_JPEG, function(err, data) {
                                    if (err) throw err;
                                    socket.end(data);
                                });
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                    //     fs.readFile('shot.jpg', function(err, data) {
                    //         // usar jimp para manipular imagen
                    //         // var encode = new Buffer(data).toString('base64');
                    //         socket.end(data);
                    //         //fs.unlink('shot.png');
                    //     });
                }
            });
        } else {
            socket.setEncoding('utf8');
            exec(cmds, function(err, out, stderr) {
                if (err) throw err;
                socket.write(out);
            });
        }
        console.log(cmds);
    });
});

//server.listen(1337, '0.0.0.0');
server.listen(1337, '127.0.0.1');
