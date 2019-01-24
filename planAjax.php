<?php
/**
 * Created by PhpStorm.
 * User: huqi1
 * Date: 2018/5/19
 * Time: 22:54
 * Use to: Plan_mode
 */
Header("Access-Control-Allow-Origin: *.spcsky.com ");
header("Cache-Control: no-cache");
function Curl($url)
{
    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_URL, $url);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch2, CURLOPT_REFERER, 'http://zsb.hitwh.edu.cn/');//模拟来路
    $temp = curl_exec($ch2);
    $httpCode = curl_getinfo($ch2,CURLINFO_HTTP_CODE); 
    curl_close($ch2);
    return array("return"=>$temp,"code"=>$httpCode);
}

$urltemp="?_from=wechat";
foreach ($_REQUEST as $key=>$value){
$urltemp.="&".$key."=".$value;
}
//print $urltemp;
$p = Curl("http://zsb.hitwh.edu.cn/ajax/SearchEnrollmentPlan.aspx".$urltemp);
http_response_code($p["code"]);
print_r($p["return"]);
