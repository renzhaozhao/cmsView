var express = require('express');
var utility = require('utility');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

var requrl = 'http://674976627.lofter.com/';
var selecter = '.photo img';
var attrs = 'src';
app.get('/', function(req, res) {
    request(requrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);

            var items = [];
            $(selecter).each(function(idx, el) {
                var src = $(el).attr(attrs);
                var filename = qu(path.basename(src));

                function qu(str) {
                    return str.split('?')[0]
                }
                download(src, filename, function() {
                    console.log(filename + ' is done');
                })
                items.push({
                    img: src,
                    base: filename
                });
            });

            res.send(items);
        }
    })

    function download(uri, filename, callback) {
        request.head(uri, function(err, res, body) {
            request(uri).pipe(fs.createWriteStream('img/' + filename)).on('close', callback);
        });
    }
})


app.listen(3000, function() {
    console.log('start in 3000')
})
