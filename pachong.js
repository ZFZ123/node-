// /**
//  * Created by fangzhou.zhu on 2018/4/9.
//  */
// var fs = require('fs');
 var http = require('http');
// var superagent = require('superagent');
// var cheerio = require('cheerio');
// var url = 'http://image.baidu.com/';
// http.get(url,function (res) {
//     var data = '';
//     res.on('data', function(chunk) {
//         data+=chunk;
//     })
//     res.on('end',function(){
//         // console.log(data);
//         filter(data)
//     })
// });
// var writeStream = fs.createWriteStream('project.json');
// // superagent.get(url).end(function (err,res) {
// //     filter(res);
// //     console.log(res)
// //
// // })
// function filter(data){
//     //保存搜索量前10的综艺节目标题
//     var result = [];
//     //将页面源代码转换为$对象
//     var $ = cheerio.load(data);
//     //查找每个综艺节目标题的外层div
//     var temp_arr = $('.imgitem img')
//     //将综艺节目标题依次保存到结果数组中
//     temp_arr.each(function(index,item){
//         console.log(item)
//         result.push(item.attr("src"));
//     })
//     console.log(result);
//     writeStream.write(JSON.stringify(result),'UTF8');
//     writeStream.end();
// }
//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');

//目标网址
var url = 'http://desk.zol.com.cn/pad/';

//本地存储目录
var dir = 'D:/images';

//创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});

//发送请求
request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('.pic img').each(function() {
            var src = $(this).attr('src');
            console.log('正在下载' + src);
            download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
            console.log('下载完成');
        });
    }
});

//下载方法
var download = function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};