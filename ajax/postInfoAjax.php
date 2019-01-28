<?php
/**
 * Created by PhpStorm.
 * User: huqi1
 * Date: 2018/5/19
 * Time: 22:54
 * Use to: postInfo
 */
header("Cache-Control: no-cache");
function Curl($url)
{
   	$cookie = tempnam ("/tmp", "CURLCOOKIE");
    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_URL, $url);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch2, CURLOPT_CONNECTTIMEOUT, 5);
  	curl_setopt($ch2, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36" );
    $temp = curl_exec($ch2);
    $httpCode = curl_getinfo($ch2,CURLINFO_HTTP_CODE); 
    curl_close($ch2);
    return array("return"=>$temp,"code"=>$httpCode);
}

$urltemp="?_from=wechat";
foreach ($_REQUEST as $key=>$value){
    if($key!="callback")
        $urltemp.="&".$key."=".$value;
}
//print $urltemp;
$p = Curl("https://www.kuaidi100.com/query".$urltemp);
http_response_code($p["code"]);
if(isset($_REQUEST["callback"])) 
    echo $_REQUEST["callback"]."(".$p["return"].")";
else 
    echo $p["return"];