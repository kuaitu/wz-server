let http = require("http");
let fs = require("fs");
let readline = require("readline");
let port = 3000;
let dataMap = new Map();
// 读取
read_file('./message.properties');

//服务器启动
http.createServer(function (req,resp) {
    let respMsg = dataMap.get(req.url);
    resp.writeHead(200, {
        "Content-Type" : "text/plain;charset=utf-8" // 输出类型
    });
    if (respMsg) {
        resp.write(respMsg);// 页面输出
    } else {
        resp.write('没有数据！');// 页面输出
    }
    resp.end();
}).listen(port);
console.log("服务器启动！使用端口:",port);

//定义读取文件方法
function read_file(path){
    let fRead = fs.createReadStream(path);
    let objReadline = readline.createInterface({
        input:fRead
    });
    objReadline.on('line',function (line) {
        if (line.indexOf("#") == -1) {
            let data = line.split("=");
            dataMap.set(data[0],data[1]);
        }
    });
}