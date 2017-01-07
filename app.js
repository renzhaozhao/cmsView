const http = require('http');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

// 设置被查询的目标网址
const requrl = "http://www.haha.mx/topic/1/new/";
const selecter = '.joke-list-item .joke-main-content a img';
const attrs = 'src';
const dir = './img/';
const images = [];
const maxpage = 2;

start();

function start() {
    console.log('开始新建目录');
    mkdirp(dir, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log('开始获取图片链接');
    for (let i = 1; i <= maxpage; i++) {
        getImage(requrl, i);
    }
}

function getImage(url, page) {
    request(url + page, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            let $ = cheerio.load(body);
            $(selecter).each(function(index, el) {
                let src = $(el).attr(attrs).replace('/small/', '/big/');
                let filename = path.basename(src);
                if (src.indexOf('http://image.haha.mx') > -1) {
                    images.push({
                        src: src,
                        filename: filename
                    })
                }
            })
            if (page === maxpage) {
                let len = images.length;
                console.log(`图片链接获取完毕！${len}`);
                console.log(`链接总数量：${len}`);
                if (len > 0) {
                    downloadImage(images.shift());
                }
                else {
                    console.log('下载完毕');
                }
            }
        }
    });
}

function downloadImage(image, callback) {
    var narr = image.src.replace("http://image.haha.mx/", "").split("/");
    http.get(image.src, function(res) {
        var imgData = "";
        //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.setEncoding("binary");
        res.on("data", function(chunk) {
            imgData += chunk;
        });
        res.on('end', function() {
            var savePath = dir + narr[0] + narr[1] + narr[2] + "_" + narr[4];
            fs.writeFile(savePath + image.filename, imgData, 'binary', function(err) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`${image.filename} 下载完成`);
                    if (images.length > 0) {
                        downloadImage(images.shift());
                    }
                    else {
                        console.log('下载完毕');
                    }
                }
            })
        })

    })
}
