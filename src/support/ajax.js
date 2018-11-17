/**
 * ajax 模块，不兼容低版本IE
 */
const BASEURL =
  process.env.NODE_ENV === "production"
      ? "http://120.78.173.191:7001"
      : "http://192.168.0.105:7001";

/**
 * ajax get方法
 * @params {String} url 请求url
 * @params {String|Function} data 参数 | 成功回调
 * @params {Function} success 回调函数
 * @params {Function} failed 失败回调
 */
function get(url, data, success, error) {
    if(typeof data === "function"){
        success = data;
        data = {};
    }
    ajax({
        url: url,
        data: data,
        success: success,
        error: error,
        method: "GET"
    });
}

/**
 * ajax post 方法
 * @params {String} url 请求url
 * @params {String|Function} data 参数
 * @params {Function} success 回调函数
 * @params {Function} failed 失败回调
 */
function post(url, data, success, error) {
    if(typeof data === "function"){
        success = data;
        data = {};
    }
    ajax({
        url: url,
        data: data,
        success: success,
        error: error,
        method: "POST"
    });
}

/**
 * ajax 请求
 * @params {Object} opts 请求参数
 * @params {String} opts.url url
 * @params {String} opts.method GET/POST
 * @params {Object} opts.data  请求数据
 * @params {Number} opts.timeout 超时
 * @params {Array}  opts.headers 请求头
 * @params {Function} opts.success 请求成功 回调参数：result, request
 * @params {Function} opts.error  请求失败  回调参数：error, request
 */
function ajax(opts){
    return new Promise((resolve,reject)=>{
        var timer;
        var hasCallbacked = false;
        processOpts(opts);
        
        var req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if(!hasCallbacked && req.readyState === 4){
                if(timer){
                    clearTimeout(timer);
                }
                
                if(req.status >=200 && req.status <300 || req.status === 304){
                    resolve(parseResult(req.responseText));
            
                }else {
                    reject(new Error("请求失败:"+ req.status));
                }
               
            }
        };
        
        req.open(opts.method, opts.url.indexOf("http")!=-1? opts.url:(BASEURL+ opts.url), true);
        
        if(opts.headers){
            for(var key in opts.headers){
                req.setRequestHeader(key, opts.headers[key]);
            }
        }
        req.send(toQueryString(opts.data));
        
        //设置定时器 判断是否超时 默认5s
        timer = setTimeout(function(){
            hasCallbacked = true;
            req.abort();//取消请求
            if(typeof(opts.error) === "function") reject(new Error("请求超时!"), req);
            return false;
        }, opts.timeout);
    });
   
}

/**
 * 处理ajax返回结果， 统一按json处理
 */
function parseResult(r){
    var result = r;
    try{
        result = JSON.parse(r);
    }catch(err){
        console.error(err);
    }
    return result;
}

/**
 * 预处理ajax选项
 */
function processOpts(opts){
    
    opts.method = opts.method || "GET";
    if(opts.method === "POST"){
        opts.headers = opts.headers || {};
        opts.headers["Content-type"] = opts.headers["Content-type"] || "application/x-www-form-urlencoded";
    }
    opts.timeout = opts.timeout || 5000;
    
}

/**
 * 对象转换为aa=value&bb=value形式
 * @params {Object} obj 
 */
function toQueryString(obj){
    var str = [];
    if (typeof obj === "string") {
        return obj;
    }
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
}

export {get,post,ajax,toQueryString};

