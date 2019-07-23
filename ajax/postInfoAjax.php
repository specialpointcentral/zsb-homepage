<?php
include_once('./define.php');
//电商ID
defined('EBusinessID') or define('EBusinessID', 'test1556903');
//电商加密私钥，快递鸟提供，注意保管，不要泄漏
defined('AppKey') or define('AppKey', '19cf16e5-8c44-4883-b7fd-dfe078aa5d4c');
//请求url
defined('ReqURL') or define('ReqURL', 'http://sandboxapi.kdniao.com:8080/kdniaosandbox/gateway/exterfaceInvoke.json');

header("Cache-Control: no-cache");
//调用查询物流轨迹
//---------------------------------------------

$logisticResult=getOrderTracesByJson();
echo $logisticResult['result'];
http_response_code($logisticResult['code']);

//---------------------------------------------
 
/**
 * Json方式 查询订单物流轨迹
 */
function getOrderTracesByJson(){
    $return = [];
    $LogisticCode = $_GET['postid'];
	$requestData= "{'OrderCode':'','ShipperCode':'EMS','LogisticCode':'$LogisticCode'}";
	$datas = array(
        'EBusinessID' => EBusinessID,
        'RequestType' => '1002',
        'RequestData' => urlencode($requestData) ,
        'DataType' => '2',
    );
    $datas['DataSign'] = encrypt($requestData, AppKey);
    $result=json_decode(sendPost(ReqURL, $datas));

    if($result->Success == false || $result->State == 0){
        $return['result']['status'] = 404;
        $return['code'] = 200;
    }else{
        // 0- 未知
        // 1- 已揽件
        // 2- 在途中
        // 3- 签收
        // 4- 问题件
        $return['code'] = 200;
        $return['result']['status'] = 200;
        switch ($result->State) {
            case 1:
                $return['result']['state'] = "1";
                break;
            case 2:
                $return['result']['state'] = "0";
                break;
            case 3:
                $return['result']['state'] = "3";
                break;
            case 4:
                $return['result']['state'] = "2";
                break;
            default:
                $return['result']['state'] = "$result->State";
                break;
        }
        $data = [];
        foreach($result->Traces as $singal){
            $temp = [];
            foreach($singal as $key => $value){
                if($key === "AcceptTime")
                    $temp['ftime'] = $value;
                if($key === "AcceptStation")
                    $temp['context'] = $value;
            }
            $data[] = $temp;
        }
        $return['result']['data'] = array_reverse($data);
    }

    $return['result'] = json_encode($return['result']);
	if (isset($_REQUEST["callback"])){
        $return['result'] = $_REQUEST["callback"] . "(" . $return['result'] . ")";
    }
        return $return;
}
 
/**
 *  post提交数据 
 * @param  string $url 请求Url
 * @param  array $datas 提交的数据 
 * @return url响应返回的html
 */
function sendPost($url, $datas) {
    $temps = array();	
    foreach ($datas as $key => $value) {
        $temps[] = sprintf('%s=%s', $key, $value);		
    }	
    $post_data = implode('&', $temps);
    $url_info = parse_url($url);
	if(empty($url_info['port']))
	{
		$url_info['port']=80;	
	}
    $httpheader = "POST " . $url_info['path'] . " HTTP/1.0\r\n";
    $httpheader.= "Host:" . $url_info['host'] . "\r\n";
    $httpheader.= "Content-Type:application/x-www-form-urlencoded\r\n";
    $httpheader.= "Content-Length:" . strlen($post_data) . "\r\n";
    $httpheader.= "Connection:close\r\n\r\n";
    $httpheader.= $post_data;
    $fd = fsockopen($url_info['host'], $url_info['port']);
    fwrite($fd, $httpheader);
    $gets = "";
	$headerFlag = true;
	while (!feof($fd)) {
		if (($header = @fgets($fd)) && ($header == "\r\n" || $header == "\n")) {
			break;
		}
	}
    while (!feof($fd)) {
		$gets.= fread($fd, 128);
    }
    fclose($fd);  
    
    return $gets;
}

/**
 * 电商Sign签名生成
 * @param data 内容   
 * @param appkey Appkey
 * @return DataSign签名
 */
function encrypt($data, $appkey) {
    return urlencode(base64_encode(md5($data.$appkey)));
}
