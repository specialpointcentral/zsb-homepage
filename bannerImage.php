<?php
header("Content-type:text/css");
$img_array = glob("./img/banner/*.{jpg,png,jpeg}",GLOB_BRACE); 
$url = $img_array[array_rand($img_array)];
echo <<<EOF
.banner-img {
    background: url($url) no-repeat;
    background-size: 100%;
}
EOF;
?>