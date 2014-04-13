<?php
require_once 'simple_html_dom.php';

// データ取得
$html = file_get_html('http://trmm.gsfc.nasa.gov/trmm_rain/Events/latest_1_day_landslide.html');
$ret = $html->find('pre')[0]->plaintext;
// 半角スペースで区切り
$pices = explode(" ", $ret);
// 空配列の削除
$pices = array_filter($pices);
// 配列の再添字
$pices = array_values($pices);

//データをJSON化
$wordNum = count($pices);
/*
for($i = 0 ; $i < $wordNum; $i += 16){
    $landslidePlaceArray[] = array(
        'country' => $pices[$i + 13],
        'place' => $pices[$i + 11]." ".$pices[$i + 12],
        'cause' => $pices[$i + 2],
        'condition' => $pices[$i + 4],
        'lat' => $pices[$i + 14],
        'lng' => $pices[$i + 15]
    );
}

$json = json_encode($landslidePlaceArray);
*/

// $getContryName = file_get_contents("http://www6.kaiho.mlit.go.jp/isewan/image/flags/_flags.htm",true);

$rowCount = 0;
$numericCount = 0;
$makeLine = array();
for($j = 0; $j < $wordNum; $j++){
  if(is_array($makeLine[$rowCount]) === false){
    $makeLine[$rowCount] = array();
  }
// $makeLine[$j] = $pices[$j];
// echo $pices[$j]." ";
// echo $makeLine[$rowCount]." ";

//var_dump($pices[$j]);

if(is_numeric($pices[$j])){
var_dump($numericCount);
     $numericCount++;
var_dump($numericCount % 5);
     if($numeriCount % 5 == 0){
            $rowCount++;
     }
}

var_dump($numericCount);
//var_dump($pices[$j]);
//var_dump($rowCount);
 array_push($makeLine[$rowCount], $pices[$j]);
var_dump($makeLine);
echo "<br />";

}

// var_dump($getContryName);

// echo $json;
// var_dump($json);
// var_dump($pices);
// var_dump($ret);

