<?php
/**
 * Created by PhpStorm.
 * User: huqi1
 * Date: 2018/5/19
 * Time: 22:54
 */
Header("Access-Control-Allow-Origin: * ");
function Curl($url)
{
    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_URL, $url);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch2, CURLOPT_REFERER, 'http://zsb.hitwh.edu.cn/');//模拟来路
    $temp = curl_exec($ch2);
    curl_close($ch2);
    return $temp;
}

$urltemp="?_pk=0";
foreach ($_REQUEST as $key=>$value){
$urltemp.="&".$key."=".$value;
}
//print $urltemp;
//this part is get the information about the enroll
//get the parameter
if(isset($_GET['mode'])&&$_GET['mode']=='getInfo'){
    $p = Curl("http://zsb.hitwh.edu.cn/enroll.aspx");
    preg_match_all("%<span id=\"Label1\">(.*?)</span>%si",$p,$temp);
    echo($temp[1][0]);
}else if(isset($_GET['mode'])&&$_GET['mode']=='getEnrollInfo'){
    $p = Curl("http://zsb.hitwh.edu.cn/ajax/EnRoll.aspx".$urltemp);
    print($p);
}

