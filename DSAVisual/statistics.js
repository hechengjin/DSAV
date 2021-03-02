const { net } = require('electron')
const getMAC = require('getmac').default
let os = require("os");
var ip = require('ip');
var iconv = require('iconv-lite');

function statistics(netip, area) {
    let mac = getMAC().toLocaleUpperCase();
    let osinfo = os.version() + " " + os.release() + " " + os.type() + " " +os.platform() + " "  + os.hostname();
    let ipinfo = ip.address()
   
      var cache = [];
      var postData = JSON.stringify({
          "userId":"0",
          "clientFlag":mac,
          "procName":"DSAVisual",
          "procVersion":"1.0.0",
          "procId":"11",
          "os":osinfo,
          "eventName":"start-up",
          "ip":ipinfo,
          "netIp":netip,
          "area":area,
          "remarks":""
        });
      const request = net.request({
          method: 'POST',
          url: 'http://www.firemail.wang:8880/api/admin/api/prodactivity/report',
          headers: {
               'Content-Type': 'application/json',
               //'Content-Length': postData.length  //Buffer.byteLength(postData)
          }
        })
  
        // 回调
      request.on('response', (response) => {
          // console.log(`**statusCode:${response.statusCode}`);
          // // 将response的内容输出出来
          // console.log(`**header:${JSON.stringify(response, function(key, value) {
          //     if (typeof value === 'object' && value !== null) {
          //         if (cache.indexOf(value) !== -1) {
          //             // 移除
          //             return;
          //         }
          //         // 收集所有的值
          //         cache.push(value);
          //     }
          //     return value;
          // })}`);
          // cache = null;
          // response.on("data", (chunk) => {
          //     console.log("接收到数据：", chunk.toString());
          // })
          // response.on('end', () => {
          //     console.log("数据接收完成");
          // })
      });
      // 写入数据
      request.write(postData);
      // 结束请求
      request.end();
}

function genStatistics () {

  const requestGet = net.request('http://whois.pconline.com.cn/');
  requestGet.on('response', (response) => {
    //response.setContentType('text/html; charset=GBK');
      response.on("data", (chunk)=>{
          //console.log("接收到数据：", chunk.toString());
          //let content = chunk.toString('utf8') // new Buffer.from(chunk, "binary").toString();
          let content = iconv.decode(chunk, 'gbk');
          var str = content;
          var start = str.indexOf("<form");
          var end = str.indexOf("</form>");
          var result1 = str.substring(start,end);//截取字符串
          var start2 = result1.indexOf("value=");
          var result2 = result1.substring(start2, result1.length)
          var netip = ""
          var area = ""
          var strs= new Array(); 
          strs=result2.split("input type="); 
            for (i=0;i<strs.length ;i++ )
            {
                if(i == 0)
                {
                    netip = strs[i].replace("value=","").replace("> <","").replace(new RegExp("\"","gm"),"")
                    
                }
                else
                {
                    var strs2= new Array(); 
                    strs2=strs[i].split("<p>"); 
                    for (i=0;i<strs2.length ;i++ )
                    {
                        if(i==1){
                            area = strs2[i].replace("</p>","").replace("\r\n","").replace(/\s/g,"")                            
                        }
                    }
                
                }
                
            }
        // console.log(netip);
        // console.log(area);
           statistics(netip, area);
      })
      response.on('end', () => {
          //console.log("数据接收完成");
      })
  });
  //结束请求，不然没有响应数据
  requestGet.end();
}

module.exports = genStatistics;
