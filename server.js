var http = require('http');
var request = require('request');
var fs = require('fs');
var express = require('express');
var bodyparser = require('body-parser');
var cheerio = require('cheerio');

var app = express(); 
var server = http.createServer(app);

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({
    extended: true
}) );

var index = fs.readFileSync("index.html");

var $ = cheerio.load(index);

request({
    url: "https://slack.com/api/channels.history?token=" + process.env.npm_package_config_slack_api_token + "&channel=" + process.env.npm_package_config_slack_channel,
    method: "GET"
},function(error, response, body){
    if(!error) {
        var messages = JSON.parse(body).messages;
        for (var cnt = 0;cnt < messages.length;cnt++) {
            if (messages[cnt].file) {
                var img = '<img class="img" src="' + messages[cnt].file.thumb_360 + '">';
                $("#imgs").append(img);
            }
        }
    }
});

app.get('/', function(request,response){
    response.send($.html());
});

server.listen(process.env.npm_package_config_port, process.env.npm_package_config_ip, function () {
    console.log( "Listening on " + process.env.npm_package_config_ip + ", port " + process.env.npm_package_config_port  )
});

