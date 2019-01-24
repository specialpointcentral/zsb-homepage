function objURL(url){
    var params = new Array();
    this.set=function(key,val){
        params[key]=encodeURIComponent(val);
    };
    this.remove=function(key){
        if(key in params) params[key]=undefined;
    };
    this.get=function(key){
        return decodeURIComponent(params[key]);
    };
    this.url=function(baseurl){
        var strurl=baseurl;
        var objps=[];
        for(var k in params){
            if(params[k]){
                objps.push(k+"="+params[k]);
            }
        }
        if(objps.length>0){
            strurl+="?"+objps.join("&");
        }
        return strurl;
    };
    this.debug=function(){
        // 以下调试代码自由设置
        var objps=[];
        for(var k in params){
            objps.push(k+"="+params[k]);
        }
        alert(objps);//输出params的所有值
    };
}
